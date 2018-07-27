function downloadAsPic() {
    html2canvas(document.querySelector("#canvas_container")).then(canvas => {
        document.body.appendChild(canvas);
        console.log(canvas);
        let url = '';
        try {
            url = canvas.toDataURL();
        }
        catch (err) {
            console.log(err);
        }
        let link = document.createElement('a');
        link.href = url;
        link.download = "cover.png";
        link.text = "press me to download"
        document.body.appendChild(link);
        link.click();
        // document.body.removeChild(link);
        document.body.removeChild(canvas);
    });
}