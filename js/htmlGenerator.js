function generateHTML() {
    const pageTitle = pageTitleInput.value || 'Página Generada';
    const colorfont = headerFooterColor.value || '#3182ce';
    const headerFontSizeValue = `${headerFontSize.value}px`;
    const headerHeightValue = `${headerHeight.value}px`;
    const footerFontSizeValue = `${footerFontSize.value}px`;
    const footerHeightValue = `${footerHeight.value}px`;
    const headerFooValue = headerFont.value;

    // Obtener las dimensiones actuales del #container
    const containerRect = editableContainer.getBoundingClientRect();
    const containerHeight = containerRect.height;

    // Recoger los componentes y sus posiciones absolutas dentro del contenedor
    const componentsHTML = Array.from(editableContainer.children)
        .filter(component => component.classList.contains('draggable-component')) // Solo los elementos con la clase 'draggable-component'
        .map(component => {
            // Capturamos las coordenadas absolutas del componente respecto al contenedor
            const rect = component.getBoundingClientRect();
            const x = rect.left - containerRect.left; // Coordenada X absoluta dentro del contenedor
            const y = rect.top - containerRect.top;  // Coordenada Y absoluta dentro del contenedor
            const width = component.offsetWidth || rect.width;
            const height = component.offsetHeight || rect.height;

            // Capturamos los estilos computados del componente
            const computedStyles = getComputedStyle(component);

            const backgroundColor = computedStyles.backgroundColor || 'lightblue';
            const textColor = computedStyles.color || 'black';
            const border = computedStyles.border || 'none';
            const fontFamily = computedStyles.fontFamily || 'Arial';
            const padding = parseInt(computedStyles.padding || 0);
            const margin = parseInt(computedStyles.margin || 0);

            // Capturamos la imagen de fondo (si existe)
            const backgroundImage = computedStyles.backgroundImage || 'none';

            // Si el componente es una etiqueta <img>, obtener la ruta de la imagen
            let imgSrc = '';
            if (component.tagName.toLowerCase() === 'img') {
                imgSrc = component.src || '';
            }

            // Si es una etiqueta o texto, lo capturamos
            const textContent = component.textContent || '';

            // HTML del componente con sus estilos y posición absoluta
            let componentHTML = `
                <div class="draggable-component" style="position: absolute; left: ${x}px; top: ${y}px; width: ${width}px; height: ${height}px; background-color: ${backgroundColor}; color: ${textColor}; border: ${border}; font-family: ${fontFamily}; padding: ${padding}px; margin: ${margin}px; background-image: ${backgroundImage};">
                    ${textContent}
            `;

            // Si es una etiqueta <img>, añadir la imagen al HTML
            if (imgSrc) {
                componentHTML += `<img src="${imgSrc}" alt="Imagen" style="width: 100%; height: auto;" />`;
            }

            // Cerramos el div del componente
            componentHTML += '</div>';

            return componentHTML;
        })
        .join('');

    // HTML completo con el tamaño de #container incluido
    const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        header {
            background-color: ${colorfont};
            font-size: ${headerFontSizeValue};  /* Valor dinámico */
            height: ${headerHeightValue};       /* Valor dinámico */
            font-family: ${headerFooValue};
            color: white;
            padding: 0px;
            text-align: center;
            flex-shrink: 0;
            width: 100%;
        }
        footer {
            background-color: ${colorfont};
            font-size: ${footerFontSizeValue};  /* Valor dinámico */
            height: ${footerHeightValue};       /* Valor dinámico */
            font-family: ${headerFooValue};
            color: white;
            padding: 0px;
            text-align: center;
            flex-shrink: 0;
            margin-top: auto;
            width: 100%;
        }
        #container {
            position: relative;
            width: 100%;
            height: ${containerHeight}px; /* Usar el alto calculado */
            background-color: lightgray;
            padding: 0px;
            overflow: hidden;
            display: block; /* Flexbox no es necesario aquí */
        }
        .draggable-component {
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: lightblue;
            padding: 10px;
            margin: 5px;
            box-sizing: border-box; /* Asegura que padding y border no afecten el tamaño */
        }
    </style>
</head>
<body class="bg-gray-200">
    <header>
        <h1>${pageTitle}</h1>
    </header>
    <div id="container">
        ${componentsHTML}
    </div>
    <footer>
        <p>Generado con el Editor Interactivo</p>
    </footer>
</body>
</html>
`;

    return htmlContent;
}
