let slots = [], pics = []; // global array holding profile pics and their backdrops for each slot, used for dynamic size and layout adjustments

function addSlot() {
    let sequence = slots.length;

    // goal:
    // </div id='slot_0' class='slot'>
    //     <img id='pic_0' class='pic' alt = 'Pic #0'>
    // </div>
    let slot_tag = document.createElement('div');
    slot_tag.setAttribute('id', 'slot_' + sequence);
    slot_tag.setAttribute('class', 'slot');
    dragElement(slot_tag); // allow drag and drop to move the element around
    slots.push(slot_tag);

    let pic_tag = document.createElement('img');
    pic_tag.setAttribute('id', 'pic_' + sequence);
    pic_tag.setAttribute('class', 'pic');
    pic_tag.setAttribute('alt', 'Pic #' + (sequence + 1));
    pics.push(pic_tag);

    let canvas_container = document.getElementById('canvas_container');
    slot_tag.appendChild(pic_tag);
    canvas_container.appendChild(slot_tag);

    updateLayout();
}

function updateLayout() {
    const can_w = 1146, can_h = 717; // canvas size is 1146 x 717
    let n = slots.length; // total number of slots
    let slot_w = 200, slot_h = 400; // size and ratio of the slot
    let w = 200, h = 355; // size of each slot, with ratio 16:9

    if (n > 5) {
        // e.g. the 6th slot will make everyone shrink 20% to make room
        let shrink_factor = 1 + 0.2 * (n - 5);
        w /= shrink_factor;
        h /= shrink_factor;
        slot_w /= shrink_factor;
        slot_h /= shrink_factor;
    }

    // calculate spacing between each slot:
    let margin = (can_w - w * n) / (n + 1);

    let left = 0; // running counter to keep track of the `left` property in css
    let top_slot = 245;
    for (let i in slots) {
        left += margin;
        // adjust position of each pic::
        pics[i].style.width = w - 10;
        pics[i].style.height = h - 10;
        pics[i].style.left = 5;
        pics[i].style.top = 20;
        // adjust position of each caption:
        // slots[i].style.width = w;
        slots[i].style.width = slot_w;
        slots[i].style.height = slot_h;
        slots[i].style.left = left;
        slots[i].style.top = top_slot;
        left += w;
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
    document.getElementById('calendar-month').innerHTML = m + y;

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
