/* copied, with modifications, from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable */

function dragElement(elmnt) {
    elmnt.onmousedown = dragMouseDown;

    let x, y;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        x = e.clientX;
        y = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        let left, top;
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        left = x - e.clientX;
        top = y - e.clientY;
        x = e.clientX;
        y = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - top) + "px";
        elmnt.style.left = (elmnt.offsetLeft - left) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
