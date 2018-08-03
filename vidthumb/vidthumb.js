let video_canvas = document.getElementById('video-canvas');

function go() {
    console.log('going');

    initVideo().then((vplayer) => {
        console.log('Total video length: %ds', vplayer.duration);
        return seekTo(vplayer, 3); // seek to 3 seconds
    }).then((vplayer) => {
        console.log('Video is now paused at the requested time.');
        //generate thumbnail URL data
        video_canvas.width = vplayer.videoWidth / 2;
        video_canvas.height = vplayer.videoHeight / 2;

        let context = video_canvas.getContext('2d');
        context.drawImage(vplayer, 0, 0, vplayer.videoWidth / 2, vplayer.videoHeight / 2);
        let data = video_canvas.toDataURL();
        //create img
        let img = document.createElement('img');
        img.setAttribute('src', data);
        //append img in container div
        document.getElementById('preview-container').appendChild(img);
    });

    console.log('gone');
}

function initVideo() {
    return new Promise((resolve, reject) => {
        let video_player = document.createElement('video');
        document.getElementById('hidden-container').appendChild(video_player); // debug use
        // load the file to video-player:
        let src = URL.createObjectURL(document.querySelector('#file-to-upload').files[0]);
        video_player.setAttribute('src', src);
        video_player.load();

        // Load metadata of the video to get video duration and dimensions
        video_player.addEventListener('loadedmetadata', function () {
            resolve(video_player);
        });
    });
}

function seekTo(vplayer, second) {
    return new Promise((resolve, reject) => {
        console.log('Promised to seek to %ds.' + second);
        vplayer.currentTime = second;
        vplayer.addEventListener('seeked', () => {
            resolve(vplayer);
        });
    });
}