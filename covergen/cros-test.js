function downloadAsPic() {
    html2canvas(document.querySelector("#canvas_container")).then(canvas => {
        document.body.appendChild(canvas);
        console.log(canvas);
        let url = canvas.toDataURL();
        let link = document.createElement('a');
        link.href = url;
        link.download = "atest.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}