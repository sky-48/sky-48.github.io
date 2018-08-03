let video_canvas = document.getElementById('video-canvas');
let video_player = document.getElementById('video-player');

function loadVideo() {
    // load the file to video-player:
    let src = URL.createObjectURL(document.querySelector("#file-to-upload").files[0]);
    video_player.setAttribute('src', src);
    video_player.load();

    // Load metadata of the video to get video duration and dimensions
    video_player.addEventListener('loadedmetadata', function () {
        console.log("Total length: %ds.", video_player.duration);
        for (i = 0; i < video_player.duration; i += 5) { // TODO - can't rapid fire like this 
            seekTo(i);
        }
        video_canvas.width = video_player.videoWidth  / 2;
        video_canvas.height = video_player.videoHeight / 2;
    });
}

function go() {
    console.log('gone')
}

function seekTo(second) {
    video_player.currentTime = second;
}

video_player.addEventListener("seeked", onSeekComplete);

function onSeekComplete(e) {
    console.log("seeked event fired");

    //generate thumbnail URL data
    let context = video_canvas.getContext("2d");
    context.drawImage(video_player, 0, 0, video_player.videoWidth / 2, video_player.videoHeight / 2);
    let data = video_canvas.toDataURL();

    //create img
    var img = document.createElement('img');
    img.setAttribute('src', data);

    //append img in container div
    document.getElementById('preview-container').appendChild(img);
}