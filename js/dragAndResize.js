function createAlignmentGuides(element) {
    const guidesContainer = document.getElementById('container');

    // Limpiar las guías previas
    const existingGuides = guidesContainer.querySelectorAll('.guide');
    existingGuides.forEach(guide => guide.remove());

    const components = Array.from(editableContainer.children);
    const elementRect = element.getBoundingClientRect();
    const containerRect = editableContainer.getBoundingClientRect();

    // Arreglo para almacenar las guías de alineación
    const alignmentGuides = [];

    components.forEach(component => {
        if (component !== element) { // No comparar el mismo elemento consigo mismo
            const rect = component.getBoundingClientRect();

            // Guías de alineación para los 4 lados del componente
            // Verificar alineación con el borde izquierdo
            if (Math.abs(rect.left - elementRect.left) < 10) { // Si la diferencia es menor a 10px
                const verticalGuide = document.createElement('div');
                verticalGuide.classList.add('guide', 'vertical');
                verticalGuide.style.left = `${rect.left - containerRect.left}px`;
                verticalGuide.style.height = `${editableContainer.offsetHeight}px`;
                alignmentGuides.push(verticalGuide);

                // Ajuste automático de la posición izquierda
                element.style.left = `${rect.left - containerRect.left}px`;
            }

            // Verificar alineación con el borde superior
            if (Math.abs(rect.top - elementRect.top) < 10) { // Si la diferencia es menor a 10px
                const horizontalGuideTop = document.createElement('div');
                horizontalGuideTop.classList.add('guide', 'horizontal');
                horizontalGuideTop.style.top = `${rect.top - containerRect.top}px`;
                horizontalGuideTop.style.width = `${editableContainer.offsetWidth}px`;
                alignmentGuides.push(horizontalGuideTop);

                // Ajuste automático de la posición superior
                element.style.top = `${rect.top - containerRect.top}px`;
            }

            // Verificar alineación con el borde derecho
            if (Math.abs(rect.right - elementRect.right) < 10) { // Si la diferencia es menor a 10px
                const verticalGuideRight = document.createElement('div');
                verticalGuideRight.classList.add('guide', 'vertical');
                verticalGuideRight.style.left = `${rect.right - containerRect.left}px`;
                verticalGuideRight.style.height = `${editableContainer.offsetHeight}px`;
                alignmentGuides.push(verticalGuideRight);

                // Ajuste automático de la posición derecha
                element.style.left = `${rect.right - containerRect.left - element.offsetWidth}px`;
            }

            // Verificar alineación con el borde inferior
            if (Math.abs(rect.bottom - elementRect.bottom) < 10) { // Si la diferencia es menor a 10px
                const horizontalGuideBottom = document.createElement('div');
                horizontalGuideBottom.classList.add('guide', 'horizontal');
                horizontalGuideBottom.style.top = `${rect.bottom - containerRect.top}px`;
                horizontalGuideBottom.style.width = `${editableContainer.offsetWidth}px`;
                alignmentGuides.push(horizontalGuideBottom);

                // Ajuste automático de la posición inferior
                element.style.top = `${rect.bottom - containerRect.top - element.offsetHeight}px`;
            }
        }
    });

    // Agregar las guías de alineación al contenedor
    alignmentGuides.forEach(guide => guidesContainer.appendChild(guide));
}

// Función para habilitar el arrastre y alineación automática de los componentes
function enableDragWithAutoAlignment(element) {
    element.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', element.id);
    });

    element.addEventListener('dragend', (e) => {
        const containerRect = editableContainer.getBoundingClientRect();
        let newX = e.pageX - containerRect.left - element.offsetWidth / 2;
        let newY = e.pageY - containerRect.top - element.offsetHeight / 2;

        // Limitar el nuevo X y Y para no salir del contenedor
        newX = Math.max(0, Math.min(newX, editableContainer.offsetWidth - element.offsetWidth));
        newY = Math.max(0, Math.min(newY, editableContainer.offsetHeight - element.offsetHeight));

        // Establecer las nuevas posiciones
        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;

        // Crear las guías después de soltar el componente
        createAlignmentGuides(element);
    });

    // Función de movimiento de arrastre
    element.addEventListener('drag', (e) => {
        const containerRect = editableContainer.getBoundingClientRect();
        let newX = e.pageX - containerRect.left - element.offsetWidth / 2;
        let newY = e.pageY - containerRect.top - element.offsetHeight / 2;

        // Limitar el nuevo X y Y para no salir del contenedor
        newX = Math.max(0, Math.min(newX, editableContainer.offsetWidth - element.offsetWidth));
        newY = Math.max(0, Math.min(newY, editableContainer.offsetHeight - element.offsetHeight));

        element.style.left = `${newX}px`;
        element.style.top = `${newY}px`;

        // Crear guías de alineación mientras se arrastra
        createAlignmentGuides(element);
    });
}

// 4. FUNCION PARA REDIMENSIONAR LOS ELEMENTOS
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');

    // Crear el resizer
    const resizer = document.createElement('div');
    resizer.classList.add('resizer');
    container.appendChild(resizer);

    // Evento para redimensionar el contenedor
    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();

        const startHeight = container.offsetHeight;
        const startY = e.clientY;

        // Función para mover el mouse
        const onMouseMove = (e) => {
            const newHeight = startHeight + (e.clientY - startY);
            if (newHeight > 50) {  // Altura mínima del contenedor
                container.style.height = newHeight + 'px';
            }
        };

        // Función para soltar el mouse
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

// Modificar la función de redimensionamiento para incluir las guías de alineación
function addResizer(element) {
    const resizer = document.createElement('div');
    resizer.classList.add('resizer');
    element.appendChild(resizer);

    resizer.addEventListener('mousedown', (e) => {
        e.preventDefault();

        const startWidth = element.offsetWidth;
        const startHeight = element.offsetHeight;
        const startX = e.clientX;
        const startY = e.clientY;

        const containerRect = editableContainer.getBoundingClientRect(); // Obtener los límites del contenedor

        // Función para mover el mouse durante el redimensionamiento
        const onMouseMove = (e) => {
            // Calcular nuevo tamaño
            let width = startWidth + (e.clientX - startX);
            let height = startHeight + (e.clientY - startY);

            // Limitar el ancho (no puede ser mayor que el ancho del contenedor)
            const maxWidth = editableContainer.offsetWidth - element.offsetLeft; // Máximo ancho permitido
            width = Math.min(width, maxWidth); // No permitir que el ancho exceda el contenedor

            // Limitar la altura (no puede ser mayor que la altura del contenedor)
            const maxHeight = editableContainer.offsetHeight - element.offsetTop; // Máxima altura permitida
            height = Math.min(height, maxHeight); // No permitir que la altura exceda el contenedor

            // Asegurarse de que el componente no se haga más pequeño que un tamaño mínimo
            width = Math.max(width, 50); // Ancho mínimo
            height = Math.max(height, 50); // Alto mínimo

            // Asignar el nuevo tamaño
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;

            // Crear las guías de alineación mientras se estira
            createAlignmentGuides(element); // Reutilizamos la función para generar guías
        };

        // Función para soltar el mouse después de redimensionar
        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}