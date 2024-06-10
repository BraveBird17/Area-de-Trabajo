document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation
    const tabs = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabs.length > 0) {
        tabs.forEach(link => {
            link.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(tabId).classList.add('active');
            });
        });
        tabs[0].click(); // Activar la primera pestaña por defecto
    } else {
        console.error("No se encontraron las pestañas.");
    }

    // Load and manage passwords
    function cargarDatosContraseñas() {
        const datosGuardados = localStorage.getItem('contraseñas');
        if (datosGuardados) {
            const contraseñas = JSON.parse(datosGuardados);
            contraseñas.forEach((contraseña, index) => {
                agregarFilaContraseña(contraseña, index);
            });
        }
    }

    function agregarFilaContraseña(contraseña, index) {
        const table = document.getElementById('password-table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        newRow.dataset.index = index;

        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);

        cell1.textContent = contraseña.username;

        const passwordWrapper = document.createElement('div');
        passwordWrapper.textContent = '********';
        passwordWrapper.classList.add('password-wrapper');
        passwordWrapper.dataset.password = contraseña.password;
        cell2.appendChild(passwordWrapper);

        const showButton = crearBotonMostrar(contraseña.password, passwordWrapper);
        cell2.appendChild(showButton);

        const accessButton = document.createElement('a');
        accessButton.textContent = 'Acceder';
        accessButton.classList.add('access-button');
        accessButton.href = contraseña.url;
        accessButton.target = '_blank';
        cell3.appendChild(accessButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.classList.add('edit-button');
        editButton.dataset.index = index;
        cell4.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.classList.add('delete-button');
        deleteButton.dataset.index = index;
        deleteButton.addEventListener('click', function() {
            eliminarFilaContraseña(index);
        });
        cell4.appendChild(deleteButton);

        asignarEventosFila(newRow);
    }

    function crearBotonMostrar(password, passwordWrapper) {
        const showButton = document.createElement('button');
        showButton.textContent = 'Mostrar';
        showButton.classList.add('show-button');
        showButton.addEventListener('click', function() {
            passwordWrapper.textContent = password;
            const hideButton = crearBotonOcultar(password, passwordWrapper);
            passwordWrapper.parentNode.appendChild(hideButton);
            this.remove();
        });
        return showButton;
    }

    function crearBotonOcultar(password, passwordWrapper) {
        const hideButton = document.createElement('button');
        hideButton.textContent = 'Ocultar';
        hideButton.classList.add('hide-button');
        hideButton.addEventListener('click', function() {
            passwordWrapper.textContent = '********';
            const showButton = crearBotonMostrar(password, passwordWrapper);
            passwordWrapper.parentNode.appendChild(showButton);
            this.remove();
        });
        return hideButton;
    }

    function asignarEventosFila(row) {
        const editButton = row.querySelector('.edit-button');
        editButton.addEventListener('click', function() {
            const index = this.dataset.index;
            const username = row.cells[0].textContent.trim();
            const password = row.querySelector('.password-wrapper').dataset.password;

            mostrarFormularioEdicion(index, username, password);
        });

        const accessButton = row.querySelector('.access-button');
        accessButton.addEventListener('click', function() {
            const url = this.href;
            window.open(url, '_blank');
        });
    }

    function mostrarFormularioEdicion(index, username, password) {
        const form = document.getElementById('edit-password-form');
        document.getElementById('edit-index').value = index;
        document.getElementById('edit-username').value = username;
        document.getElementById('edit-password').value = password;
        form.style.display = 'block';
    }

    document.getElementById('save-edit').addEventListener('click', function() {
        const index = document.getElementById('edit-index').value;
        const username = document.getElementById('edit-username').value;
        const password = document.getElementById('edit-password').value;

        const datosGuardados = localStorage.getItem('contraseñas');
        const contraseñas = JSON.parse(datosGuardados);

        if (username) {
            contraseñas[index].username = username;
        }
        if (password) {
            contraseñas[index].password = password;
        }

        localStorage.setItem('contraseñas', JSON.stringify(contraseñas));

        alert('Contraseña editada correctamente');
        location.reload();
    });

    document.getElementById('add-password').addEventListener('click', function() {
        const username = document.getElementById('new-username').value;
        const password = document.getElementById('new-password').value;
        const url = document.getElementById('new-url').value;

        if (username && password && url) {
            const nuevaContraseña = { username: username, password: password, url: url };

            const datosGuardados = localStorage.getItem('contraseñas');
            const contraseñas = datosGuardados ? JSON.parse(datosGuardados) : [];
            contraseñas.push(nuevaContraseña);
            localStorage.setItem('contraseñas', JSON.stringify(contraseñas));

            agregarFilaContraseña(nuevaContraseña, contraseñas.length - 1);

            document.getElementById('new-username').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('new-url').value = '';
            document.getElementById('add-password-form').style.display = 'none';
        }
    });

    document.getElementById('delete-all-passwords').addEventListener('click', function() {
        if (confirm('¿Está seguro de que desea borrar todas las contraseñas?')) {
            localStorage.removeItem('contraseñas');
            location.reload();
        }
    });

    function eliminarFilaContraseña(index) {
        const datosGuardados = localStorage.getItem('contraseñas');
        const contraseñas = JSON.parse(datosGuardados);
        contraseñas.splice(index, 1);
        localStorage.setItem('contraseñas', JSON.stringify(contraseñas));
        location.reload();
    }

    cargarDatosContraseñas();
});
