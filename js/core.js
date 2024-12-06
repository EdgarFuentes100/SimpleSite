// 1. DEFINIICION DE VARIABLES Y ELEMENTOS DOM
const editableContainer = document.getElementById('container');
const downloadBtn = document.getElementById('downloadBtn');
const previewBtn = document.getElementById('previewBtn');
const previewModal = document.getElementById('previewModal');
const pageTitleInput = document.getElementById('pageTitle');
const headerFooterColor = document.getElementById('headerFooterColor');
const headerFontSize = document.getElementById('headerFontSize');
const headerHeight = document.getElementById('headerHeight');
const footerFontSize = document.getElementById('footerFontSize');
const footerHeight = document.getElementById('footerHeight');
const headerFont = document.getElementById('headerFont');
const previewIframe = document.getElementById('previewIframe');
const closePreviewBtn = document.getElementById('closePreviewBtn');
let componentIdCounter = 1; // Contador para generar IDs únicos


// 2. FUNCION OARA AGREGAR ELEMENTOS

document.getElementById('addDiv').addEventListener('click', () => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('draggable-component');
    newDiv.setAttribute('draggable', 'true');
    newDiv.id = `component-${componentIdCounter++}`;
    newDiv.style.width = '150px';
    newDiv.style.height = '100px';
    newDiv.textContent = ' DIV ' + componentIdCounter;
    addResizer(newDiv);
    editableContainer.appendChild(newDiv);
    enableDragWithAutoAlignment(newDiv); // Activar arrastre con alineación automática
});

document.getElementById('addImg').addEventListener('click', () => {
    const newImg = document.createElement('img');
    newImg.src = '';
    newImg.classList.add('draggable-component');
    newImg.setAttribute('draggable', 'true');
    newImg.id = `component-${componentIdCounter++}`;
    newImg.style.width = '150px';
    newImg.style.height = '150px';
    addResizer(newImg);
    editableContainer.appendChild(newImg);
    enableDragWithAutoAlignment(newImg); // Activar arrastre con alineación automática
});

document.getElementById('addLabel').addEventListener('click', () => {
    const newLabel = document.createElement('label');
    newLabel.classList.add('draggable-component');
    newLabel.setAttribute('draggable', 'true');
    newLabel.id = `component-${componentIdCounter++}`;
    newLabel.textContent = 'Nuevo Label ' + componentIdCounter;
    newLabel.style.width = 'auto';
    newLabel.style.height = 'auto';
    addResizer(newLabel);
    editableContainer.appendChild(newLabel);
    enableDragWithAutoAlignment(newLabel); // Activar arrastre con alineación automática
});

