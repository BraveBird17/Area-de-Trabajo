document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tabs
    document.querySelectorAll('.platform-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            let parent = this.closest('.platform');
            parent.querySelectorAll('.platform-tab').forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');

            let tabId = this.dataset.tab;
            parent.querySelectorAll('.platform-tab-content').forEach(content => {
                content.style.display = 'none';
            });
            parent.querySelector(`#${tabId}`).style.display = 'block';
        });
    });

    // Inicializar expandir/colapsar
    document.querySelectorAll('.toggle-expand').forEach(button => {
        button.addEventListener('click', function() {
            let content = this.closest('.platform').querySelector('.platform-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
            this.closest('.platform-header').classList.toggle('active');
        });
    });

    // Inicializar primera pestaña y primera sección expandida
    document.querySelectorAll('.platform').forEach(platform => {
        platform.querySelector('.platform-tab').click();
        platform.querySelector('.platform-header').click();
    });
});
