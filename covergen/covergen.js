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
    pic_tag.setAttribute('onmousedown', 'bringToFront(' + sequence + ')');
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
        [[]], // 0
        [[414, 40],
        { 'decor-coffee': [812, 15,], 'decor-pen': [1016, 179,], 'decor-pencil': [1040, 47,], }], // 1
        [[240, 40], [583, 40],
        { 'decor-coffee': [887, 20,], 'decor-pen': [1020, 170,], 'decor-pencil': [1053, 26,], }], // 2
        [[133, 178], [447, 56], [758, 169],
        { 'decor-coffee': [873, -31,], 'decor-pen': [1017, 158,], 'decor-pencil': [1043, 41,], }], // 3
        [[70, 221], [318, 111], [567, 51], [809, 222],
        { 'decor-coffee': [827, 14,], 'decor-pen': [1011, 153,], 'decor-pencil': [1038, 21,], }], // 4
        [[39, 264], [245, 88], [460, 209], [667, 111], [877, 285],
        { 'decor-coffee': [855, -34,], 'decor-pen': [1014, 116,], 'decor-pencil': [1043, 14,], }], // 5
        [[20, 331], [203, 83], [386, 247], [565, 41], [747, 241], [935, 341],
        { 'decor-coffee': [821, 27,], 'decor-pen': [990, 117,], 'decor-pencil': [1031, 29,], }], //6
        [[20, 247], [197, 367], [250, 15], [433, 195], [604, 45], [780, 187], [961, 356],
        { 'decor-coffee': [819, 12,], 'decor-pen': [983, 120,], 'decor-pencil': [1034, 29,], }], //7
        [[270, 375], [470, 14], [270, 14], [680, 14], [470, 375], [680, 375], [65, 233], [880, 233],
        { 'decor-coffee': [882, -30,], 'decor-pen': [1019, 135,], 'decor-pencil': [1047, 39,], }], //8
        [[219.829, 25], [401.371, 25], [582.914, 25], [764.457, 25], [56.2381, 365], [274.19, 365], [492.143, 365], [710.095, 365], [928.048, 365],
        { 'decor-coffee': [1037, 30,], 'decor-pen': [953, 104,], 'decor-pencil': [1008, 108,], }], //9
        [[206.238, 25], [374.19, 25], [542.143, 25], [710.095, 25], [878.048, 25], [56.2381, 365], [274.19, 365], [492.143, 365], [710.095, 365], [928.048, 365],
        { 'decor-coffee': [1067, 62,], 'decor-pen': [1089, 258,], 'decor-pencil': [1119, 234,], }], //10
    ];

    if (n < presets.length) { // predefined positions:
        for (let i in slots) { // the first i elements are [left, top] properties each slot:
            slots[i].style.width = slot_w;
            slots[i].style.height = slot_h;
            let left = presets[n][i][0];
            let top = presets[n][i][1];
            slots[i].style.left = left;
            slots[i].style.top = top;
        }
        if (presets[n][slots.length]) { // the last element is for decoration objects:
            let decors = presets[n][slots.length];
            Object.keys(decors).forEach(el => {
                document.getElementById(el).style.left = decors[el][0];
                document.getElementById(el).style.top = decors[el][1];
            });
        }
    }
    else { // auto generate positions, *working in progress*:

        let n1 = Math.floor(n / 2); // number of slots on first row
        let n2 = n - n1; // number of slots on the second row

        if (n > 13) {
            // additional slots will make everyone shrink to make room,
            let shrink_factor = 1 + 0.10 * (n - 13);
            slot_w /= shrink_factor;
            slot_h /= shrink_factor;
        }

        let margin_left = 200; // avoid the calendar
        let margin_right = 100;
        let margin = (can_w - margin_left - margin_right - slot_w * n1) / (n1 + 1);

        let left = margin_left; // running counter to keep track of the `left` property in css
        let top = 25; // offsets for `top` property

        console.log('margin for row1 = ' + margin);
        for (let i = 0; i < n1; i++) {
            left += margin;
            slots[i].style.width = slot_w;
            slots[i].style.height = slot_h;
            slots[i].style.left = left;
            slots[i].style.top = top;
            left += slot_w;
        }

        // second row:
        margin = (can_w - slot_w * n2) / (n2 + 1);
        left = 0;
        top = 365;
        console.log('margin for row2 = ' + margin);

        for (let i = n1; i < n; i++) {
            left += margin;
            slots[i].style.width = slot_w;
            slots[i].style.height = slot_h;
            slots[i].style.left = left;
            slots[i].style.top = top;
            left += slot_w;
        }
    }
}

function printPositions() {
    let m = "[";
    for (let i in slots) {
        m += "[";
        m += slots[i].style.left + ",";
        m += slots[i].style.top + "],"
    };

    m += '{';
    ['decor-coffee', 'decor-pen', 'decor-pencil'].forEach((el) => {
        m += "'" + el + "':[";
        ['left', 'top'].forEach((property) => {
            let value = document.getElementById(el).style[property];
            m += value + ',';
        });
        m += '],'
    });
    m += '}], //';
    m += slots.length;
    m = m.replace(/px/g, '');
    console.log(m);
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

    updateSuggestions();
}

function updateSuggestions() {
    let abbrs = document.getElementById('members-abbr').value;
    let members = getMemberNamesFromFileName(abbrs);
    let el_title = document.getElementById('suggestion-title');
    let el_summary = document.getElementById('suggestion-summary');

    let date = document.getElementById('calendar-selection').value || '#日期还没选#';
    let template_title = `【SNH48】Team X ${date} 口袋48（电台）直播 【${members}】`;
    let template_summary = `口袋48
#SNH48-Team X#
【直播成员】${members}
2016年Team X队成员口袋48直播合辑【传送门：av6425941】
2017年Team X队成员口袋48直播合辑【传送门：av6732203】
更多相关内容欢迎加入TeamX应援群370882358
欢迎关注B站@SNH48-TeamX应援会，微博@SNH48-TeamX-应援会。`;
    el_title.value = template_title;
    el_summary.value = template_summary;
}

function downloadAsPic() {
    if (!document.getElementById('calendar-date').innerHTML) {
        if (!confirm('日期还没选择，就要下载吗？（日期格式例如：2018-07-28）')) {
            return;
        }
    }
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
