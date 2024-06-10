document.addEventListener('DOMContentLoaded', function () {
    // Cargar datos iniciales
    cargarDatos();

    // Función para cargar datos desde localStorage
    function cargarDatos() {
        var datosGuardados = localStorage.getItem('tareas');
        if (datosGuardados) {
            var tareas = JSON.parse(datosGuardados);
            tareas.forEach(function (tarea, index) {
                agregarFilaTabla(tarea, index);
            });
        }
    }

    // Función para guardar datos en localStorage
    function guardarDatos(tareas) {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    // Función para agregar una fila a la tabla
    function agregarFilaTabla(tarea, index) {
        var tableBody = document.getElementById('daily-table').getElementsByTagName('tbody')[0];
        var newRow = tableBody.insertRow();
        newRow.dataset.index = index;

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);
        var cell5 = newRow.insertCell(4);
        var cell6 = newRow.insertCell(5);

        cell1.textContent = tarea.tarea;

        var jiraLink = document.createElement('a');
        jiraLink.href = tarea.jira;
        jiraLink.textContent = tarea.jira ? "Ver JIRA" : "No hay JIRA";
        jiraLink.target = "_blank";
        cell2.appendChild(jiraLink);

        cell3.textContent = tarea.comentario;

        var progresoWrapper = document.createElement('div');
        progresoWrapper.classList.add('progreso-wrapper');

        var progresoCircle = document.createElement('div');
        progresoCircle.classList.add('progreso-circle', tarea.progreso || 'no-empezado');
        progresoCircle.dataset.estado = tarea.progreso || 'no-empezado';

        var progresoText = document.createElement('span');
        progresoText.classList.add('progreso-text');
        progresoText.textContent = textoEstado(tarea.progreso);

        progresoWrapper.appendChild(progresoCircle);
        progresoWrapper.appendChild(progresoText);
        cell4.appendChild(progresoWrapper);

        var horasInput = document.createElement('input');
        horasInput.type = 'text';
        horasInput.classList.add('horas-input');
        horasInput.value = tarea.horas || '00:00';
        cell5.appendChild(horasInput);

        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('btn-edit');
        editButton.dataset.index = index;
        cell6.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.classList.add('btn-delete');
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', function () {
            eliminarFila(index);
        });
        cell6.appendChild(deleteButton);

        asignarEventosFila(newRow);
    }

    // Función para obtener el texto del estado
    function textoEstado(estado) {
        switch (estado) {
            case 'en-progreso':
                return 'En progreso';
            case 'realizado':
                return 'Realizado';
            case 'pospuesto':
                return 'Pospuesto';
            default:
                return 'No empezado';
        }
    }

    // Función para asignar eventos de progreso
    function asignarEventosProgreso(progresoCircle, progresoText, index) {
        progresoCircle.addEventListener('click', function () {
            var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
            var tarea = tareas[index];

            // Cambiar el estado del progreso
            switch (progresoCircle.dataset.estado) {
                case 'no-empezado':
                    progresoCircle.dataset.estado = 'en-progreso';
                    progresoCircle.className = 'progreso-circle en-progreso';
                    progresoText.textContent = 'En progreso';
                    tarea.progreso = 'en-progreso';
                    break;
                case 'en-progreso':
                    progresoCircle.dataset.estado = 'realizado';
                    progresoCircle.className = 'progreso-circle realizado';
                    progresoText.textContent = 'Realizado';
                    tarea.progreso = 'realizado';
                    break;
                case 'realizado':
                    progresoCircle.dataset.estado = 'pospuesto';
                    progresoCircle.className = 'progreso-circle pospuesto';
                    progresoText.textContent = 'Pospuesto';
                    tarea.progreso = 'pospuesto';
                    break;
                default:
                    progresoCircle.dataset.estado = 'no-empezado';
                    progresoCircle.className = 'progreso-circle no-empezado';
                    progresoText.textContent = 'No empezado';
                    tarea.progreso = 'no-empezado';
                    break;
            }

            // Guardar el cambio en el localStorage
            tareas[index] = tarea;
            guardarDatos(tareas);
        });
    }

    // Función para actualizar las horas
    function actualizarHoras(index, horas) {
        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas[index].horas = horas;
        guardarDatos(tareas);
    }

    // Función para mostrar el formulario de edición
    function mostrarFormularioEdicion(index, tarea) {
        var form = document.getElementById('add-task-form');
        document.getElementById('new-task').value = tarea.tarea || '';
        document.getElementById('new-jira').value = tarea.jira || '';
        document.getElementById('new-comment').value = tarea.comentario || '';
        document.getElementById('task-index').value = index;
        form.style.display = 'block';
    }

    // Mostrar el formulario al hacer clic en "Añadir Tarea"
    document.getElementById('add-task-button').addEventListener('click', function () {
        var form = document.getElementById('add-task-form');
        form.style.display = 'block';
        document.getElementById('task-index').value = ''; // Limpiar índice al añadir nueva tarea
    });

    // Guardar tarea al hacer clic en "Guardar"
    document.getElementById('save-task').addEventListener('click', function () {
        var tarea = document.getElementById('new-task').value;
        var jira = document.getElementById('new-jira').value;
        var comentario = document.getElementById('new-comment').value;
        var index = document.getElementById('task-index').value;

        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];

        if (index !== "") {
            // Actualizar tarea existente
            tareas[index].tarea = tarea;
            tareas[index].jira = jira;
            tareas[index].comentario = comentario;
        } else {
            // Añadir nueva tarea
            tareas.push({ tarea, jira, comentario, progreso: 'no-empezado', horas: '00:00' });
        }

        guardarDatos(tareas);
        actualizarTabla();
        document.getElementById('add-task-form').reset();
        document.getElementById('add-task-form').style.display = 'none';
    });

    // Función para eliminar una fila
    function eliminarFila(index) {
        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.splice(index, 1);
        guardarDatos(tareas);
        actualizarTabla();
    }

    // Borrar todas las tareas al hacer clic en "Borrar todo"
    document.getElementById('delete-all-tasks').addEventListener('click', function () {
        localStorage.removeItem('tareas');
        actualizarTabla();
    });

    // Función para actualizar la tabla
    function actualizarTabla() {
        var tableBody = document.getElementById('daily-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = '';
        cargarDatos();
    }

    // Exportar a Excel
    document.getElementById('export-excel').addEventListener('click', function () {
        var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        
        // Construir los datos para el Excel
        var excelData = tareas.map(function (tarea) {
            return {
                'Tarea': tarea.tarea,
                'JIRA': tarea.jira,
                'Comentario': tarea.comentario,
                'Progreso': textoEstado(tarea.progreso),
                'Horas Dedicadas': tarea.horas
            };
        });

        // Crear hoja de trabajo
        var worksheet = XLSX.utils.json_to_sheet(excelData);

        // Crear libro de trabajo
        var workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Daily");

        // Descargar el archivo Excel
        XLSX.writeFile(workbook, 'tareas_daily.xlsx');
    });

    // Añadir eventos a los botones de "Tareas Mensuales" e "Imputar Horas"
    document.getElementById('tareas-mensuales').addEventListener('click', function() {
        window.open('https://contacte.aoc.cat/issues/?filter=11127', '_blank');
    });

    document.getElementById('imputar-horas').addEventListener('click', function() {
        window.open('https://contacte.aoc.cat/secure/Dashboard.jspa?selectPageId=10908', '_blank');
    });

    // Asignar eventos a las filas
    function asignarEventosFila(row) {
        var index = row.dataset.index;
        var progresoCircle = row.querySelector('.progreso-circle');
        var progresoText = row.querySelector('.progreso-text');
        var horasInput = row.querySelector('.horas-input');

        asignarEventosProgreso(progresoCircle, progresoText, index);
        horasInput.addEventListener('change', function () {
            actualizarHoras(index, this.value);
        });

        var editButton = row.querySelector('.btn-edit');
        editButton.addEventListener('click', function () {
            var tareas = JSON.parse(localStorage.getItem('tareas')) || [];
            mostrarFormularioEdicion(index, tareas[index]);
        });
    }
});
