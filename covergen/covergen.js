let slots = [], pics = []; // global array holding profile pics and their backdrops for each slot, used for dynamic size and layout adjustments
let zIndexCounter = 10000; // keep track of assigned z-index: each user click will bring the object to front, with an higher z-index

function addSlot() {
    let sequence = slots.length;

    // goal:
    // </div id='slot_0' class='slot'>
    //     <img id='pic_0' class='pic' alt = 'Pic #0'>
    // </div>
    let slot_tag = document.createElement('div');
    slot_tag.setAttribute('id', 'slot_' + sequence);
    slot_tag.setAttribute('class', 'slot');
    slot_tag.setAttribute('crossorigin', 'anonymous');
    dragElement(slot_tag); // allow drag and drop to move the element around
    slots.push(slot_tag);

    let pic_tag = document.createElement('img');
    pic_tag.setAttribute('id', 'pic_' + sequence);
    pic_tag.setAttribute('class', 'pic');
    pic_tag.setAttribute('alt', 'Pic #' + (sequence + 1));
    pic_tag.setAttribute('crossorigin', 'anonymous');
    pic_tag.setAttribute('onmousedown', 'bringToFront(' + sequence + ')')
    pics.push(pic_tag);

    let canvas_container = document.getElementById('canvas_container');
    slot_tag.appendChild(pic_tag);
    canvas_container.appendChild(slot_tag);

    updateLayout();
}

function bringToFront(seq) {
    if (slots[seq]) { // input could either be a seq number or the slot object
        seq = slots[seq];
    }
    seq.style.zIndex = ++zIndexCounter;
}

// m = ""; for (let i in slots) { m += i + ":"; m += slots[i].style.left + ","; m += slots[i].style.top + ";" }
function updateLayout() {
    const can_w = 1146, can_h = 717; // canvas size is 1146 x 717
    let n = slots.length; // total number of slots
    let slot_w = 283, slot_h = 576; // size and ratio of the slot

    let top_slot = 60;


    if (n > 2) {
        // additional slots will make everyone shrink to make room,
        // but stops shrinking after 7 slots
        let shrink_factor = 1 + 0.15 * (Math.min(n, 7) - 2);
        slot_w /= shrink_factor;
        slot_h /= shrink_factor;
    }


    const presets = [
        [[]],
        [[414, 40],],
        [[240, 40], [583, 40],],
        [[133, 178], [447, 56], [758, 169],],
        [[70, 221], [318, 111], [567, 51], [809, 222],],
        [[39, 264], [245, 88], [460, 209], [667, 111], [877, 285],],
        [[20, 331], [203, 83], [386, 247], [565, 41], [747, 241], [935, 341],],
        [[20, 247], [197, 367], [250, 15], [433, 195], [604, 45], [780, 187], [961, 356],],
        [[265, 376], [467, 13], [270, 13], [681, 12], [476, 374], [683, 373], [66, 232], [881, 238],],
    ];

    if (slots.length <= 8) { // predefined:
        for (let i in slots) {
            slots[i].style.width = slot_w;
            slots[i].style.height = slot_h;
            let left = presets[slots.length][i][0];
            let top = presets[slots.length][i][1];
            console.log("left=" + left + ", top=" + top);
            slots[i].style.left = left;
            slots[i].style.top = top;
        }
    }
    else { // auto generated:
        // calculate spacing between each slot:
        let margin_left = 180;
        let margin_right = 220;
        let margin = (can_w - margin_left - margin_right - slot_w * n) / (n + 1);

        let left = margin_left; // running counter to keep track of the `left` property in css

        for (let i in slots) {
            left += margin;
            slots[i].style.width = slot_w;
            slots[i].style.height = slot_h;
            slots[i].style.left = left;
            slots[i].style.top = top_slot;
            left += slot_w;
        }
    }
}

function addContent(content) { // called when each new file is uploaded
    addSlot();
    pics[pics.length - 1].src = content;
}

function updateCalendar(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [y, m, d] = date.split('-');
    m = months[m - 1];
    console.log(`input=${date} date=${date} year=${y} month=${m} date=${d}`);

    document.getElementById('calendar-date').innerHTML = d;
    document.getElementById('calendar-month').innerHTML = `<b>${m.toUpperCase()}</b> ${y}`;

}

function downloadAsPic() {
    html2canvas(document.querySelector("#canvas_container")).then(canvas => {
        try {
            document.body.appendChild(canvas);
            // let url = canvas.toDataURL();
            let url = canvas.toDataURL('image/jpeg', 0.8);
            let link = document.createElement('a');
            link.href = url;
            link.download = "covergen_" + (new Date()).getTime() + ".jpg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            document.body.removeChild(canvas);
        }
        catch (err) {
            console.log(err.message);
        }
    });
}

function getMemberNamesFromFileName(filename) { // converts file name (e.g. 'C:\fakepath\qj.png') to member name(s)
    let filename_extension = filename.split(/(\\|\/)/g).pop(); // e.g.: "/usr/bin/pics.png" -> "pics.png"
    let abbr = filename_extension.replace(/\.[A-Za-z]+$/g, ''); // e.g.: "pics.png" -> "pics"

    for (let member of team_x_members) {
        abbr = abbr.replace(member.abbr, member.sname);
        abbr = abbr.replace(member.abbr.toLowerCase(), member.sname);
    }
    return abbr;
}
