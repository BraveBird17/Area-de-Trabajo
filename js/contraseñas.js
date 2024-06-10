document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de localStorage y agregar filas a la tabla
    function cargarDatos() {
        var datosGuardados = localStorage.getItem('contraseñas');
        if (datosGuardados) {
            var contraseñas = JSON.parse(datosGuardados);
            contraseñas.forEach(function(contraseña, index) {
                agregarFilaTabla(contraseña, index);
            });
        }
    }

    // Función para agregar una fila a la tabla
    function agregarFilaTabla(contraseña, index) {
        var table = document.getElementById('password-table').getElementsByTagName('tbody')[0];
        var newRow = table.insertRow();
        newRow.dataset.index = index;
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3);

        cell1.textContent = contraseña.username;

        var copyUserButton = document.createElement('i');
        copyUserButton.classList.add('fas', 'fa-copy', 'copy-button');
        copyUserButton.style.cursor = 'pointer';
        copyUserButton.style.marginLeft = '10px';
        copyUserButton.addEventListener('click', function() {
            copiarAlPortapapeles(contraseña.username);
            alert('Usuario copiado al portapapeles');
        });
        cell1.appendChild(copyUserButton);

        var passwordWrapper = document.createElement('div');
        passwordWrapper.textContent = '********';
        passwordWrapper.classList.add('password-wrapper');
        passwordWrapper.dataset.password = contraseña.password;
        cell2.appendChild(passwordWrapper);

        var showButton = crearBotonMostrar(contraseña.password, passwordWrapper);
        cell2.appendChild(showButton);

        var copyPasswordButton = document.createElement('i');
        copyPasswordButton.classList.add('fas', 'fa-copy', 'copy-button');
        copyPasswordButton.style.cursor = 'pointer';
        copyPasswordButton.style.marginLeft = '10px';
        copyPasswordButton.dataset.password = contraseña.password;
        copyPasswordButton.addEventListener('click', function() {
            copiarAlPortapapeles(contraseña.password);
            alert('Contraseña copiada al portapapeles');
        });
        cell2.appendChild(copyPasswordButton);

        var accessButton = document.createElement('button');
        accessButton.textContent = 'Acceder';
        accessButton.classList.add('access-button');
        accessButton.dataset.url = contraseña.url;
        accessButton.addEventListener('click', function() {
            window.open(contraseña.url, '_blank');
        });
        cell3.appendChild(accessButton);

        var editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        editButton.dataset.index = index;
        editButton.addEventListener('click', function() {
            mostrarFormularioEdicion(index, contraseña);
        });
        cell4.appendChild(editButton);

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', function() {
            eliminarFila(index);
        });
        cell4.appendChild(deleteButton);
    }

    // Función para crear un botón de mostrar contraseña
    function crearBotonMostrar(password, passwordWrapper) {
        var showButton = document.createElement('button');
        showButton.textContent = 'Mostrar';
        showButton.classList.add('show-button');
        showButton.addEventListener('click', function() {
            passwordWrapper.textContent = password;

            var hideButton = crearBotonOcultar(password, passwordWrapper);
            passwordWrapper.parentNode.appendChild(hideButton);
            passwordWrapper.parentNode.appendChild(this);
            this.remove();
        });
        return showButton;
    }

    // Función para crear un botón de ocultar contraseña
    function crearBotonOcultar(password, passwordWrapper) {
        var hideButton = document.createElement('button');
        hideButton.textContent = 'Ocultar';
        hideButton.classList.add('hide-button');
        hideButton.addEventListener('click', function() {
            passwordWrapper.textContent = '********';
            var showButton = crearBotonMostrar(password, passwordWrapper);
            passwordWrapper.parentNode.appendChild(showButton);
            this.remove();
        });
        return hideButton;
    }

    // Función para copiar texto al portapapeles
    function copiarAlPortapapeles(texto) {
        var elementoTemporal = document.createElement('textarea');
        elementoTemporal.value = texto;
        document.body.appendChild(elementoTemporal);
        elementoTemporal.select();
        document.execCommand('copy');
        document.body.removeChild(elementoTemporal);
    }

    // Función para mostrar el formulario de edición
    function mostrarFormularioEdicion(index, contraseña) {
        var form = document.getElementById('edit-password-form');
        document.getElementById('edit-index').value = index;
        document.getElementById('edit-username').value = contraseña.username;
        document.getElementById('edit-password').value = contraseña.password;
        document.getElementById('edit-url').value = contraseña.url;
        form.style.display = 'block';
    }

    // Guardar edición
    document.getElementById('save-edit').addEventListener('click', function() {
        var index = document.getElementById('edit-index').value;
        var username = document.getElementById('edit-username').value;
        var password = document.getElementById('edit-password').value;
        var url = document.getElementById('edit-url').value;

        var datosGuardados = localStorage.getItem('contraseñas');
        var contraseñas = JSON.parse(datosGuardados);

        // Actualizar los valores en el objeto correspondiente
        if (username) {
            contraseñas[index].username = username;
        }
        if (password) {
            contraseñas[index].password = password;
        }
        if (url) {
            contraseñas[index].url = url;
        }

        // Guardar los datos actualizados en localStorage
        localStorage.setItem('contraseñas', JSON.stringify(contraseñas));
        location.reload();
    });

    // Mostrar el formulario de añadir contraseña
    document.getElementById('show-add-password-form').addEventListener('click', function() {
        document.getElementById('add-password-form').style.display = 'block';
    });

    // Añadir una nueva contraseña
    document.getElementById('add-password').addEventListener('click', function() {
        var username = document.getElementById('new-username').value;
        var password = document.getElementById('new-password').value;
        var url = document.getElementById('new-url').value;

        if (username && password && url) {
            var nuevaContraseña = { username: username, password: password, url: url };

            var datosGuardados = localStorage.getItem('contraseñas');
            var contraseñas = datosGuardados ? JSON.parse(datosGuardados) : [];
            contraseñas.push(nuevaContraseña);
            localStorage.setItem('contraseñas', JSON.stringify(contraseñas));

            agregarFilaTabla(nuevaContraseña, contraseñas.length - 1);

            document.getElementById('new-username').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('new-url').value = '';
            document.getElementById('add-password-form').style.display = 'none';
        }
    });

    // Eliminar una fila
    function eliminarFila(index) {
        var datosGuardados = localStorage.getItem('contraseñas');
        var contraseñas = JSON.parse(datosGuardados);
        contraseñas.splice(index, 1);
        localStorage.setItem('contraseñas', JSON.stringify(contraseñas));
        location.reload();
    }

    // Borrar todas las contraseñas
    document.getElementById('delete-all-passwords').addEventListener('click', function() {
        localStorage.removeItem('contraseñas');
        location.reload();
    });

    // Cargar datos al inicio
    cargarDatos();
});
