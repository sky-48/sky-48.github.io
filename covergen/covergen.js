let pics = [], slots = []; // global array holding profile pics and their backdrops for each slot, used for dynamic size and layout adjustments

function addSlot() {

    // if (pics.length >= 5) {
    //     alert("暂时只支持5个，6人以上考虑分两排显示。");
    //     return;
    // }

    let sequence = pics.length;

    // generate an <input> tag for editing texts, similar to the following as an example:
    // <input id='input_text_1' type="text" oninput="setText('p_1', this.value)" onchange="setText('p_1', this.value)">
    let file_selection_container = document.getElementById('file_selection_container');
    let input_text = document.createElement("input");
    input_text.setAttribute('id', 'input_text_' + sequence);
    input_text.setAttribute('type', 'text');
    let script_line = "setText('p_" + sequence + "', this.value)";
    input_text.setAttribute('oninput', script_line);
    input_text.setAttribute('onchange', script_line);
    file_selection_container.appendChild(input_text);

    // generate an <input> tag for uploading files, similar to the following as an example:
    // <input id='input_file_1' type="file" onchange="uploadFile(this, '1')"><br>
    let input_file = document.createElement("input");
    input_file.setAttribute('id', 'input_file_' + sequence);
    input_file.setAttribute('type', 'file');
    input_file.setAttribute('onchange', "uploadFile(this, '" + sequence + "')");
    file_selection_container.appendChild(input_file);
    file_selection_container.appendChild(document.createElement("br"));


    // <div id="dragdiv" style="position: absolute; width: 200px">
    //     <img id="" src='border.png' style="">
    //     <img id="" src='pic.png' style="">
    // </div>
    //     <div id="slot_1" class="slot" >
    //     <img id="" src='pic.png' style="position: absolute; left: 5px; top: 10px; width: 200px; cursor: move">
    // </div>


    // generate an <img> tag similar to the following:
    // <img id="img_1" alt="1" style="position: absolute; top: 100px; left: 200px; width: 20%; cursor: move" class="dragme">
    let canvas_container = document.getElementById('canvas_container');

    let slot_tag = document.createElement("div");
    slot_tag.setAttribute('id', 'slot_' + sequence);
    slot_tag.setAttribute('class', 'slot');

    let pic_tag = document.createElement("img");
    pic_tag.setAttribute('id', 'pic_' + sequence);
    pic_tag.setAttribute('class', 'pic');
    pic_tag.setAttribute('alt', 'Pic #' + (sequence + 1));

    slot_tag.appendChild(pic_tag);
    canvas_container.appendChild(slot_tag);
    // append <img> and <p> tags to global array, so we can adjust their positions at a later time:
    pics.push(pic_tag);
    slots.push(slot_tag);

    dragElement(document.getElementById("slot_" + sequence));

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

function uploadFile(that, seq) {
    if (that.files[0]) {
        // display pic:
        pics[seq].src = window.URL.createObjectURL(that.files[0]);
        // console.log(getMemberNamesFromFileName(that.value));
    }
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
