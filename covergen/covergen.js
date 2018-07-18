let pics = [], captions = []; // global array for dynamic size and layout adjustments

function addSlot() {
    let sequence = pics.length;
    
    // generate an <input> tag for editing texts, similar to the following as an example:
    // <input id='input_text_1' type="text" oninput="setText('p_1', this.value)" onchange="setText('p_1', this.value)">
    let file_selection_container = document.getElementById('file_selection_container');
    let input_text = document.createElement("input");
    input_text.setAttribute('id', 'input_text_' + sequence );
    input_text.setAttribute('type', 'text');
    let script_line = "setText('p_" + sequence + "', this.value)";
    input_text.setAttribute('oninput', script_line);
    input_text.setAttribute('onchange', script_line);
    file_selection_container.appendChild(input_text);
    
    // generate an <input> tag for uploading files, similar to the following as an example:
    // <input id='input_file_1' type="file" onchange="uploadFile(this, '1')"><br>
    let input_file = document.createElement("input");
    input_file.setAttribute('id', 'input_file_' + sequence );
    input_file.setAttribute('type', 'file');
    input_file.setAttribute('onchange', "uploadFile(this, '" + sequence + "')");
    file_selection_container.appendChild(input_file);
    file_selection_container.appendChild(document.createElement("br"));
    
    // generate an <img> tag similar to the following:
    // <img id="img_1" alt="1" style="position: absolute; top: 100px; left: 200px; width: 20%; cursor: move" class="dragme">
    let canvas_container = document.getElementById('canvas_container');
    let img_tag = document.createElement("img");
    img_tag.setAttribute('id', 'img_' + sequence);
    img_tag.setAttribute('class', 'dragme');
    img_tag.setAttribute('style', 'position: absolute; cursor: move');
    img_tag.setAttribute('alt', '#' + (sequence + 1));
    canvas_container.appendChild(img_tag);
    
    // generate an <p> tag similar to the following:
    // <p id="p_1" style="position: absolute; top: 100px; left: 200px; width: 20%; cursor: move" class="dragme">
    let p_tag = document.createElement("p");
    p_tag.setAttribute('id', 'p_' + sequence);
    p_tag.setAttribute('class', 'dragme');
    p_tag.setAttribute('style', 'position: absolute; cursor: move; color: white; text-align: center');
    p_tag.innerHTML = '#' + (sequence + 1);
    canvas_container.appendChild(p_tag);
    
    // append <img> and <p> tags to global array, so we can adjust their positions at a later time:
    pics.push(img_tag);
    captions.push(p_tag);
    
    updateLayout();
}

function updateLayout() {
    const can_w = 1146, can_h = 717;  // canvas size is 1146 x 717
    let n = pics.length; // total number of slots
    let w = 200, h = 355; // size of each slot, with ratio 16:9
    
    if (n > 5) {
        // e.g. the 6th slot will make everyone shrink 20% to make room
        let shrink_factor = 1 + 0.2 * (n - 5);
        w /= shrink_factor;
        h /= shrink_factor;
    }
    
    // calculate spacing between each slot:
    const min_margin = 20; // minimum space required, but actual margin might be bigger if slots are sparse
    let margin = min_margin + ((can_w - w * n - min_margin * (n + 1)) / (n + 1));
    
    let left = 0; // running counter to keep track of the `left` property in css
    let top = 240;
    for(let i in pics) {
        left += margin;
        // adjust position of each pic::
        pics[i].style.width = w;
        pics[i].style.height = h;
        pics[i].style.left = left;
        pics[i].style.top = top;
        // adjust position of each caption:
        captions[i].style.width = w;
        captions[i].style.left = left;
        captions[i].style.top = top + h;
        left += w;
    }
}

function uploadFile(that, seq) {
    if (that.files[0]) {
        // display pic:
        pics[seq].src = window.URL.createObjectURL(that.files[0]);
        // display text, using file name as the default:
        let filename_extension = that.value.split(/(\\|\/)/g).pop(); // e.g.: "/usr/bin/pics.png" -> "pics.png"
        let filename = filename_extension.replace(/\.[A-Za-z]+$/g, ''); // e.g.: "pics.png" -> "pics"
        document.getElementById("input_text_" + seq).value = filename;
        setText('p_' + seq, filename);
    }
}

function setText(target_id, msg) {
    document.getElementById(target_id).innerHTML = mapAbbrToName(msg);
}

function mapAbbrToName(abbr) {
    for (let member of team_x_members) {
        abbr = abbr.replace(member.abbr, member.sname);
        abbr = abbr.replace(member.abbr.toLowerCase(), member.sname);
        console.log(member.abbr);
    }
    return abbr;
}

