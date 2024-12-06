// 7. FUNCION PARA LOS EVENTOS DE LOS BOTONES
downloadBtn.addEventListener('click', () => {
    const htmlContent = generateHTML();

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pagina_generada.html';
    a.click();
});

// Vista previa en el modal
previewBtn.addEventListener('click', () => {
    const htmlContent = generateHTML();

    previewIframe.contentWindow.document.open();
    previewIframe.contentWindow.document.write(htmlContent);
    previewIframe.contentWindow.document.close();

    previewModal.style.display = 'flex';
});

// Cerrar vista previa
closePreviewBtn.addEventListener('click', () => {
    previewModal.style.display = 'none';
});