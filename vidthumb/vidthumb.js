let video_canvas = document.getElementById('video-canvas');
const total_slots = 6;

let x;
function go() {
    Promise.all(
        [initVideo('file1'), initVideo('file2'), initVideo('file3'), initVideo('file4')]
    ).then((vplayers) => {
        x = vplayers;
        let total_duration = vplayers.reduce((accum, vplayer) => accum += vplayer.duration, 0);
        console.log('Total %d video(s) found, total duration: %ds.', vplayers.length, total_duration);

        vplayers.forEach(vplayer => seekTo(vplayer, 3).then(addFrame));
    });
}

function initVideo(inputElementId) {
    return new Promise((resolve, reject) => {
        let video_player = document.createElement('video');
        // document.getElementById('hidden-container').appendChild(video_player); // debug use
        // load the file to video-player:
        let src = URL.createObjectURL(document.getElementById(inputElementId).files[0]);
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
        console.log('Promised to extract %d frame(s).', second);
        vplayer.currentTime = second;
        vplayer.addEventListener('seeked', () => {
            resolve(vplayer);
        });
    });
}

function addFrame(vplayer) {
    console.log('Adding requested frame to preview.');
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
    console.log('Frame added.');
}