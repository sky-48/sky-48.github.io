let video_canvas = document.getElementById('video-canvas');
const total_slots = 6;
let job_queue = [];

let x;
function go() {
    let inputs = ['file1', 'file2', 'file3', 'file4'].map(id => document.getElementById(id));
    let files = [];
    inputs.forEach(input => {
        let file = input.files[0];
        if (file) {
            files.push(file);
        }
    });

    Promise.all(
        files.map(initVideo)
    ).then(vplayers => {
        let total_duration = vplayers.reduce((accum, vplayer) => accum += vplayer.duration, 0);
        console.log('Total %d video(s) found, total duration: %ds.', vplayers.length, total_duration);

        vplayers.forEach(vplayer => {
            job_queue.push({ 'vplayer': vplayer, 'time': 1 });
            job_queue.push({ 'vplayer': vplayer, 'time': 2 });
            job_queue.push({ 'vplayer': vplayer, 'time': 3 });
        });

        console.log('Total %d job(s) queued.', job_queue.length);
    }).then(dispatch)//.catch(alert);
}

function dispatch() {
    let job = job_queue.shift();
    if (job) {
        console.log('Dispatching job: seek to %ds.', job['time']);
        seekTo(job['vplayer'], job['time']).then(addFrame).then(dispatch);
    }
}

function initVideo(file) {
    console.log("Initializing video for file: " + file);
    return new Promise((resolve, reject) => {
        let video_player = document.createElement('video');
        // document.getElementById('hidden-container').appendChild(video_player); // debug use
        // load the file to video-player:
        video_player.setAttribute('src', URL.createObjectURL(file));
        video_player.load();
        // Load metadata of the video to get video duration and dimensions
        video_player.addEventListener('loadedmetadata', function () {
            resolve(video_player);
        });
    });
}

function seekTo(vplayer, second) {
    return new Promise((resolve, reject) => {
        console.log('Promised to pause the video at %ds.', second);
        vplayer.currentTime = second;
        vplayer.addEventListener('seeked', () => {
            console.log('As promised, video is paused at %ds.', second);
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