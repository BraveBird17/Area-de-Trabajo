# Area-de-Trabajo
# Gestor de Marcadores y Tareas

Este proyecto proporciona una interfaz web para la gestión de contraseñas, la organización de tareas diarias, y el acceso a diversas plataformas. Está diseñado para permitir a los usuarios agregar, editar y eliminar contraseñas, gestionar tareas diarias con un sistema de progreso y registrar el tiempo dedicado.

## Características

- **Plataformas**: Acceso rápido a diversas plataformas con URLs de ejemplo y gestión de entornos PRO y PRE.
- **Gestión de Contraseñas**: Añadir, editar y eliminar contraseñas con funcionalidad de copia y protección.
- **Daily**: Gestión de tareas diarias con estados de progreso, horas dedicadas, y exportación a Excel.
- **Moderno diseño de navegación**: Interfaz estética y fácil de usar con navegación intuitiva.

## Capturas de Pantalla

### Plataformas
![Plataformas Screenshot](images/plataformas-screenshot.png)

### Contraseñas
![Contraseñas Screenshot](images/contraseñas-screenshot.png)

### Daily
![Daily Screenshot](images/daily-screenshot.png)

## Instalación

### Prerrequisitos

Asegúrate de tener los siguientes requisitos antes de comenzar:
- Un navegador web moderno (Chrome, Firefox, Safari)
- Conexión a Internet

### Pasos

1. **Clona el repositorio**:
    ```bash
    git clone https://github.com/tu-usuario/gestor-marcadores.git
    ```

2. **Navega al directorio del proyecto**:
    ```bash
    cd gestor-marcadores
    ```

3. **Abre `index.html` en tu navegador**:
    Puedes hacer doble clic en `index.html` o abrirlo manualmente desde tu navegador.

## Uso

### Plataformas

1. Haz clic en la pestaña **Plataformas**.
2. Expande la sección de cada plataforma para ver las URLs de ejemplo en entornos PRO y PRE.

### Contraseñas

1. Haz clic en la pestaña **Contraseñas**.
2. Añade una nueva contraseña usando el formulario "Añadir Contraseña".
3. Edita o borra contraseñas existentes utilizando los botones correspondientes.
4. Copia el usuario o la contraseña usando los iconos de copia.

### Daily

1. Haz clic en la pestaña **Daily**.
2. Añade una nueva tarea usando el botón "Añadir Tarea".
3. Edita o borra tareas existentes utilizando los botones correspondientes.
4. Cambia el estado de la tarea haciendo clic en los círculos de estado.
5. Ingresa el tiempo dedicado a cada tarea directamente en la tabla.

### Exportar a Excel

1. Haz clic en el botón "Exportar a Excel" en la pestaña **Daily** para descargar un archivo Excel con las tareas.

## Estructura del Proyecto

gestor-marcadores/
├── css/
│ ├── styles.css # Estilos generales del proyecto
│ ├── cssDaily.css # Estilos específicos para la pestaña Daily
│ └── contraseñas.css # Estilos específicos para la pestaña Contraseñas
├── js/
│ ├── scripts.js # Scripts generales del proyecto
│ ├── jsDaily.js # Scripts específicos para la pestaña Daily
│ └── contraseñas.js # Scripts específicos para la pestaña Contraseñas
├── images/
│ ├── NTT_Data-Logo.wine.png # Logo de la empresa
│ ├── wl12.png # Imagen para el expandir de WL12
│ ├── Apache_Tomcat_logo.svg.png # Imagen para expandir de Tomcat
│ └── [otras imágenes] # Otras imágenes utilizadas en el proyecto
├── index.html # Página principal del proyecto

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para discutir los cambios que desees implementar.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
