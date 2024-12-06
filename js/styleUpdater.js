// 6. FUNCIONES PARA APLICAR ESTILOS

// Función para actualizar los estilos en tiempo real       
function updatePreviewStyles() {
    const pageTitle = pageTitleInput.value || 'Página Generada';
    const colorfont = headerFooterColor.value;
    const headerFontSizeValue = `${headerFontSize.value}px`;
    const headerHeightValue = `${headerHeight.value}px`;
    const footerFontSizeValue = `${footerFontSize.value}px`;
    const footerHeightValue = `${footerHeight.value}px`;
    const headerFooValue = headerFont.value;

    // Acceder al contenido del iframe para actualizar los estilos
    const doc = previewIframe.contentWindow.document;

    // Cambiar el título de la página en el iframe
    const titleElement = doc.querySelector('h1');
    titleElement.textContent = pageTitle;

    // Cambiar el estilo del header
    const headerElement = doc.querySelector('header');
    headerElement.style.backgroundColor = colorfont;
    headerElement.style.fontSize = headerFontSizeValue;
    headerElement.style.height = headerHeightValue;
    headerElement.style.fontFamily = headerFooValue;

    // Cambiar el estilo del footer
    const footerElement = doc.querySelector('footer');
    footerElement.style.backgroundColor = colorfont;
    footerElement.style.fontSize = footerFontSizeValue;
    footerElement.style.height = footerHeightValue;
    footerElement.style.fontFamily = headerFooValue;

    // Cambiar el color de fondo del contenedor (si es necesario)
    const containerElement = doc.querySelector('#container');
    containerElement.style.backgroundColor = 'lightgray'; // Esto puede cambiarse también si se necesita
}

// Aplicar la función a cada uno de los controles de entrada
pageTitleInput.addEventListener('input', updatePreviewStyles);
headerFooterColor.addEventListener('input', updatePreviewStyles);
headerFontSize.addEventListener('input', updatePreviewStyles);
headerHeight.addEventListener('input', updatePreviewStyles);
footerFontSize.addEventListener('input', updatePreviewStyles);
footerHeight.addEventListener('input', updatePreviewStyles);
headerFont.addEventListener('input', updatePreviewStyles);