document.addEventListener('DOMContentLoaded', function() {
    // Asignar eventos a las pestañas
    document.querySelectorAll('.tab-link').forEach(link => {
        link.addEventListener('click', function() {
            var tabId = this.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
            cargarScriptsEstilos(tabId);
        });
    });

    document.querySelector('.tab-link').click(); // Activar la primera pestaña por defecto

    function cargarScriptsEstilos(tabId) {
        var contraseñaStyle = document.getElementById('contraseñas-style');
        var contraseñaScript = document.getElementById('contraseñas-script');

        if (tabId === 'contraseñas') {
            contraseñaStyle.href = 'css/contraseñas.css';
            contraseñaStyle.disabled = false;
            contraseñaScript.src = 'js/contraseñas.js';
            contraseñaScript.disabled = false;
        } else {
            contraseñaStyle.href = '#';
            contraseñaStyle.disabled = true;
            contraseñaScript.src = '#';
            contraseñaScript.disabled = true;
        }
    }
});
