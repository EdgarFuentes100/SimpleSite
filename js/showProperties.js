// Variables
const components = document.querySelectorAll('[draggable="true"]'); // Los componentes
const modal = document.getElementById('modal'); // Modal
const applyBtn = document.getElementById('applyBtn'); // Botón de aplicar
const cancelBtn = document.getElementById('cancelBtn'); // Botón de cancelar
const editForm = document.getElementById('edit-form'); // Formulario de edición

let selectedComponent = null; // Componente seleccionado actualmente

// 1. Delegar eventos de clic derecho para manejar los componentes dinámicos
editableContainer.addEventListener('contextmenu', (e) => {
    // Prevenir el comportamiento por defecto (el menú contextual del navegador)
    e.preventDefault();

    // Verificar si el clic derecho fue sobre un componente (por ejemplo, un div, img, label, etc.)
    const component = e.target;

    // Si el componente es un div, imagen o label (o cualquier otro componente que agregues dinámicamente)
    if (component.classList.contains('draggable-component')) {
        // Elimina la clase 'selected' de cualquier componente previamente seleccionado
        if (selectedComponent) {
            selectedComponent.classList.remove('border-4', 'border-blue-500');
        }

        // Marca el componente seleccionado con un borde
        selectedComponent = component;
        selectedComponent.classList.add('border-4', 'border-blue-500');

        // Mostrar el modal
        modal.classList.remove('hidden');

        // Mostrar las propiedades del componente en el modal
        showProperties(selectedComponent);
    }
});

// Función para mostrar las propiedades del componente seleccionado
function showProperties(component) {
    editForm.innerHTML = ''; // Limpiar el formulario actual

    // Verificar el tipo de componente y mostrar sus propiedades
    if (component.nodeName === 'DIV') {
        editForm.innerHTML = `
           <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <!-- Color de fondo -->
    <div>
        <label class="block mb-1 text-left text-sm">Color de fondo:</label>
        <input type="color" value="${rgbToHex(window.getComputedStyle(component).backgroundColor)}" id="bgColor" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>
    <!-- Color de texto -->
    <div>
        <label class="block mb-1 text-left text-sm">Color de texto:</label>
        <input type="color" value="${rgbToHex(window.getComputedStyle(component).color)}" id="textColor" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>
    <!-- Tamaño de fuente -->
    <div>
        <label class="block mb-1 text-left text-sm">Tamaño de fuente:</label>
        <input type="number" value="${parseInt(window.getComputedStyle(component).fontSize)}" id="fontSize" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>
    <!-- Ancho -->
    <div>
        <label class="block mb-1 text-left text-sm">Ancho:</label>
        <input type="number" value="${component.offsetWidth}" id="width" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Alto -->
    <div>
        <label class="block mb-1 text-left text-sm">Alto:</label>
        <input type="number" value="${component.offsetHeight}" id="height" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>
    <!-- Borde -->
    <div>
        <label class="block mb-1 text-left text-sm">Borde:</label>
        <input type="color" value="${rgbToHex(window.getComputedStyle(component).borderColor)}" id="borderColor" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>
    <!-- Estilo de borde -->
    <div>
        <label class="block mb-1 text-left text-sm">Estilo de Borde:</label>
        <select id="borderStyle" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="solid" ${window.getComputedStyle(component).borderStyle === 'solid' ? 'selected' : ''}>Sólido</option>
            <option value="dotted" ${window.getComputedStyle(component).borderStyle === 'dotted' ? 'selected' : ''}>Punteado</option>
            <option value="dashed" ${window.getComputedStyle(component).borderStyle === 'dashed' ? 'selected' : ''}>Raya</option>
        </select>
    </div>
    <!-- Grosor del borde -->
    <div>
        <label class="block mb-1 text-left text-sm">Grosor del borde:</label>
        <input type="number" value="${parseInt(window.getComputedStyle(component).borderWidth)}" id="borderWidth" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Texto del div -->
    <div>
        <label class="block mb-1 text-left text-sm">Texto del div:</label>
        <input type="text" value="${component.innerText}" id="divText" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Padding -->
    <div>
        <label class="block mb-1 text-left text-sm">Padding:</label>
        <input type="text" value="${window.getComputedStyle(component).padding}" id="padding" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>
    <!-- Margin -->
    <div>
        <label class="block mb-1 text-left text-sm">Margin:</label>
        <input type="text" value="${window.getComputedStyle(component).margin}" id="margin" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>
    <!-- Border Radius -->
    <div>
        <label class="block mb-1 text-left text-sm">Border Radius:</label>
        <input type="text" value="${window.getComputedStyle(component).borderRadius}" id="borderRadius" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Box Shadow -->
    <div>
        <label class="block mb-1 text-left text-sm">Box Shadow:</label>
        <select id="boxShadow" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="none" ${window.getComputedStyle(component).boxShadow === 'none' ? 'selected' : ''}>Ninguna</option>
            <option value="0px 4px 6px rgba(0, 0, 0, 0.1)" ${window.getComputedStyle(component).boxShadow === '0px 4px 6px rgba(0, 0, 0, 0.1)' ? 'selected' : ''}>Sombra suave</option>
            <option value="0px 4px 10px rgba(0, 0, 0, 0.2)" ${window.getComputedStyle(component).boxShadow === '0px 4px 10px rgba(0, 0, 0, 0.2)' ? 'selected' : ''}>Sombra media</option>
            <option value="0px 6px 20px rgba(0, 0, 0, 0.3)" ${window.getComputedStyle(component).boxShadow === '0px 6px 20px rgba(0, 0, 0, 0.3)' ? 'selected' : ''}>Sombra intensa</option>
        </select>
    </div>

    <!-- Propiedades adicionales -->
    <div>
        <label class="block mb-1 text-left text-sm">Alineación de texto:</label>
        <select id="textAlign" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="left" ${window.getComputedStyle(component).textAlign === 'left' ? 'selected' : ''}>Izquierda</option>
            <option value="center" ${window.getComputedStyle(component).textAlign === 'center' ? 'selected' : ''}>Centro</option>
            <option value="right" ${window.getComputedStyle(component).textAlign === 'right' ? 'selected' : ''}>Derecha</option>
        </select>
    </div>

    <div>
        <label class="block mb-1 text-left text-sm">Alineación de los elementos:</label>
        <select id="textAlignItems" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="flex-start" ${window.getComputedStyle(component).alignItems === 'flex-start' ? 'selected' : ''}>Inicio</option>
            <option value="center" ${window.getComputedStyle(component).alignItems === 'center' ? 'selected' : ''}>Centro</option>
            <option value="flex-end" ${window.getComputedStyle(component).alignItems === 'flex-end' ? 'selected' : ''}>Final</option>
        </select>
    </div>

    <div>
        <label class="block mb-1 text-left text-sm">Overflow:</label>
        <select id="overflow" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="visible" ${window.getComputedStyle(component).overflow === 'visible' ? 'selected' : ''}>Visible</option>
            <option value="hidden" ${window.getComputedStyle(component).overflow === 'hidden' ? 'selected' : ''}>Oculto</option>
            <option value="scroll" ${window.getComputedStyle(component).overflow === 'scroll' ? 'selected' : ''}>Desplazamiento</option>
        </select>
    </div>

    <div>
        <label class="block mb-1 text-left text-sm">Position:</label>
        <select id="position" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="static" ${window.getComputedStyle(component).position === 'static' ? 'selected' : ''}>Estático</option>
            <option value="relative" ${window.getComputedStyle(component).position === 'relative' ? 'selected' : ''}>Relativo</option>
            <option value="absolute" ${window.getComputedStyle(component).position === 'absolute' ? 'selected' : ''}>Absoluto</option>
        </select>
    </div>
</div>

        `;
    } else if (component.nodeName === 'IMG') {
        editForm.innerHTML = `
           <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <!-- Fuente de la Imagen (URL) -->
    <div>
        <label class="block mb-1 text-left text-sm">Fuente de la Imagen (URL):</label>
        <input type="text" value="${component.src}" id="imgSrc" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Ancho -->
    <div>
        <label class="block mb-1 text-left text-sm">Ancho:</label>
        <input type="number" value="${component.width}" id="imgWidth" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Alto -->
    <div>
        <label class="block mb-1 text-left text-sm">Alto:</label>
        <input type="number" value="${component.height}" id="imgHeight" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Opacidad -->
    <div>
        <label class="block mb-1 text-left text-sm">Opacidad:</label>
        <input type="range" min="0" max="1" step="0.1" value="${window.getComputedStyle(component).opacity}" id="imgOpacity" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Cambiar imagen (Subir desde el PC) -->
    <div class="col-span-2">
        <label class="block mb-1 text-left text-sm">Cambiar imagen (Subir desde el PC):</label>
        <input type="file" id="imgUpload" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Nuevos campos adicionales para la imagen -->
    <!-- Borde -->
    <div>
        <label class="block mb-1 text-left text-sm">Borde:</label>
        <input type="color" value="${window.getComputedStyle(component).borderColor}" id="imgBorderColor" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Estilo de borde -->
    <div>
        <label class="block mb-1 text-left text-sm">Estilo de Borde:</label>
        <select id="imgBorderStyle" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="solid" ${window.getComputedStyle(component).borderStyle === 'solid' ? 'selected' : ''}>Sólido</option>
            <option value="dotted" ${window.getComputedStyle(component).borderStyle === 'dotted' ? 'selected' : ''}>Punteado</option>
            <option value="dashed" ${window.getComputedStyle(component).borderStyle === 'dashed' ? 'selected' : ''}>Raya</option>
        </select>
    </div>

    <!-- Grosor del borde -->
    <div>
        <label class="block mb-1 text-left text-sm">Grosor del borde:</label>
        <input type="number" value="${parseInt(window.getComputedStyle(component).borderWidth)}" id="imgBorderWidth" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Border Radius -->
    <div>
        <label class="block mb-1 text-left text-sm">Border Radius:</label>
        <input type="text" value="${window.getComputedStyle(component).borderRadius}" id="imgBorderRadius" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
    </div>

    <!-- Box Shadow -->
    <div>
        <label class="block mb-1 text-left text-sm">Box Shadow:</label>
        <select id="imgBoxShadow" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="none" ${window.getComputedStyle(component).boxShadow === 'none' ? 'selected' : ''}>Ninguna</option>
            <option value="0px 4px 6px rgba(0, 0, 0, 0.1)" ${window.getComputedStyle(component).boxShadow === '0px 4px 6px rgba(0, 0, 0, 0.1)' ? 'selected' : ''}>Sombra suave</option>
            <option value="0px 4px 10px rgba(0, 0, 0, 0.2)" ${window.getComputedStyle(component).boxShadow === '0px 4px 10px rgba(0, 0, 0, 0.2)' ? 'selected' : ''}>Sombra media</option>
            <option value="0px 6px 20px rgba(0, 0, 0, 0.3)" ${window.getComputedStyle(component).boxShadow === '0px 6px 20px rgba(0, 0, 0, 0.3)' ? 'selected' : ''}>Sombra intensa</option>
        </select>
    </div>

    <!-- Posición -->
    <div>
        <label class="block mb-1 text-left text-sm">Posición:</label>
        <select id="imgPosition" class="mb-4 w-full p-2 rounded-md text-left shadow-sm border border-gray-300 h-9">
            <option value="static" ${window.getComputedStyle(component).position === 'static' ? 'selected' : ''}>Estático</option>
            <option value="relative" ${window.getComputedStyle(component).position === 'relative' ? 'selected' : ''}>Relativo</option>
            <option value="absolute" ${window.getComputedStyle(component).position === 'absolute' ? 'selected' : ''}>Absoluto</option>
        </select>
    </div>
</div>

        `;
    } else if (component.nodeName === 'LABEL' || component.nodeName === 'SPAN') {
        editForm.innerHTML = `
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block mb-2">Texto:</label>
                    <input type="text" value="${component.textContent}" id="labelText" class="mb-4 w-full p-2 rounded-md">
                </div>
                <div>
                    <label class="block mb-2">Color de texto:</label>
                    <input type="color" value="${rgbToHex(window.getComputedStyle(component).color)}" id="labelColor" class="mb-4 w-full p-2 rounded-md">
                </div>
                <div>
                    <label class="block mb-2">Tamaño de fuente:</label>
                    <input type="number" value="${parseInt(window.getComputedStyle(component).fontSize)}" id="labelFontSize" class="mb-4 w-full p-2 rounded-md">
                </div>
                <div>
                    <label class="block mb-2">Alineación del texto:</label>
                    <select id="labelTextAlign" class="mb-4 w-full p-2 rounded-md">
                        <option value="left" ${window.getComputedStyle(component).textAlign === 'left' ? 'selected' : ''}>Izquierda</option>
                        <option value="center" ${window.getComputedStyle(component).textAlign === 'center' ? 'selected' : ''}>Centro</option>
                        <option value="right" ${window.getComputedStyle(component).textAlign === 'right' ? 'selected' : ''}>Derecha</option>
                    </select>
                </div>
            </div>
        `;
    }
}

// Convertir RGB a hexadecimal
function rgbToHex(rgb) {
    const result = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(rgb);
    return result ? "#" + ((1 << 24) + (parseInt(result[1]) << 16) + (parseInt(result[2]) << 8) + parseInt(result[3])).toString(16).slice(1) : rgb;
}

// Evento para aplicar los cambios
applyBtn.addEventListener('click', () => {
    updateComponentProperties();
    modal.classList.add('hidden'); // Cerrar el modal
});

// Evento para cancelar los cambios
cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden'); // Cerrar el modal
});

// Función para actualizar las propiedades del componente
function updateComponentProperties() {
    if (selectedComponent.nodeName === 'DIV') {
        // Obtener y aplicar los nuevos valores a selectedComponent
        selectedComponent.style.backgroundColor = document.getElementById('bgColor').value;
        selectedComponent.style.color = document.getElementById('textColor').value;
        selectedComponent.style.fontSize = document.getElementById('fontSize').value + 'px';
        selectedComponent.style.width = document.getElementById('width').value + 'px';
        selectedComponent.style.height = document.getElementById('height').value + 'px';
        selectedComponent.style.borderColor = document.getElementById('borderColor').value;
        selectedComponent.style.borderStyle = document.getElementById('borderStyle').value;
        selectedComponent.style.borderWidth = document.getElementById('borderWidth').value + 'px';
        selectedComponent.innerText = document.getElementById('divText').value;
        // Nuevos campos adicionales
        selectedComponent.style.padding = document.getElementById('padding').value;
        selectedComponent.style.margin = document.getElementById('margin').value;
        selectedComponent.style.borderRadius = document.getElementById('borderRadius').value;
        selectedComponent.style.boxShadow = document.getElementById('boxShadow').value;
        selectedComponent.style.textAlign = document.getElementById('textAlign').value;
        selectedComponent.style.alignItems = document.getElementById('textAlignItems').value;
        selectedComponent.style.overflow = document.getElementById('overflow').value;
        selectedComponent.style.position = document.getElementById('position').value;
        

    } else if (selectedComponent.nodeName === 'IMG') {
        // Cambiar imagen desde URL
        const imgSrc = document.getElementById('imgSrc').value;
        if (imgSrc) selectedComponent.src = imgSrc;  // Cambiar imagen desde URL

        // Ajustar dimensiones de la imagen
        selectedComponent.style.width = document.getElementById('imgWidth').value + 'px';
        selectedComponent.style.height = document.getElementById('imgHeight').value + 'px';

        // Ajustar opacidad
        selectedComponent.style.opacity = document.getElementById('imgOpacity').value;

        // Cambiar imagen desde archivo (subir desde PC)
        const fileInput = document.getElementById('imgUpload');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                selectedComponent.src = e.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        }

        // Nuevas propiedades

        // Borde de la imagen
        const borderColor = document.getElementById('imgBorderColor').value;
        if (borderColor) selectedComponent.style.borderColor = borderColor;

        // Estilo del borde
        const borderStyle = document.getElementById('imgBorderStyle').value;
        if (borderStyle) selectedComponent.style.borderStyle = borderStyle;

        // Grosor del borde
        const borderWidth = document.getElementById('imgBorderWidth').value;
        if (borderWidth) selectedComponent.style.borderWidth = borderWidth + 'px';

        // Border Radius
        const borderRadius = document.getElementById('imgBorderRadius').value;
        if (borderRadius) selectedComponent.style.borderRadius = borderRadius;

        // Box Shadow
        const boxShadow = document.getElementById('imgBoxShadow').value;
        if (boxShadow) selectedComponent.style.boxShadow = boxShadow;

        // Posición
        const position = document.getElementById('imgPosition').value;
        if (position) selectedComponent.style.position = position;


    } else if (selectedComponent.nodeName === 'LABEL' || selectedComponent.nodeName === 'SPAN') {
        selectedComponent.textContent = document.getElementById('labelText').value;
        selectedComponent.style.color = document.getElementById('labelColor').value;
        selectedComponent.style.fontSize = document.getElementById('labelFontSize').value + 'px';
        selectedComponent.style.textAlign = document.getElementById('labelTextAlign').value;
    }
}

// Cerrar el modal si el usuario hace clic fuera de él
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});