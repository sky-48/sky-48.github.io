/* Modified from https://codepen.io/joezimjs/pen/yPWQbd */

let dropArea = document.getElementById("drop-area");

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults);
    document.body.addEventListener(eventName, preventDefaults);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
        dropArea.classList.add('highlight');
    });
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, (e) => {
        dropArea.classList.remove('highlight');
    });
});

// Handle dropped files
dropArea.addEventListener('drop', (e) => {
    handleFiles(e.dataTransfer.files);
});

function handleFiles(files) { // called by both drag-and-drop and file browser dialog
    [...files].forEach(readFile);
}

function readFile(file) {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = function () {
        let img = document.createElement('img');
        let content = reader.result;
        img.src = content;
        document.getElementById('gallery').appendChild(img);
        addContent(content); // covergen
    }
}