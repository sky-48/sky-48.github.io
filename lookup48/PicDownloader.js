const http = require('http');
const fs = require('fs');

const URL_TEMPLATE = "http://www.snh48.com/images/member/gs4_$SID_$INDEX.jpg";

const MEMBERS = [
  { sid: "10081", name: "陈琳" },
  { sid: "10082", name: "冯晓菲" },
  { sid: "10213", name: "刘静晗" },
  { sid: "10204", name: "鲁静萍" },
  { sid: "10188", name: "李星羽" },
  { sid: "10153", name: "吕一" },
  { sid: "10084", name: "李钊" },
  { sid: "10126", name: "潘瑛琪" },
  { sid: "10164", name: "祁静" },
  { sid: "10214", name: "冉蔚" },
  { sid: "10087", name: "宋昕冉" },
  { sid: "10088", name: "孙歆文" },
  { sid: "10215", name: "王菲妍" },
  { sid: "10089", name: "汪佳翎" },
  { sid: "10091", name: "王晓佳" },
  { sid: "10092", name: "谢天依" },
  { sid: "10093", name: "杨冰怡" },
  { sid: "10096", name: "张丹三" },
  { sid: "10149", name: "张嘉予" },
  { sid: "10218", name: "张琼予" },
  { sid: "10083", name: "李晶" },
  { sid: "10148", name: "林忆宁" },
  { sid: "10090", name: "汪束" },
  { sid: "10167", name: "徐诗琪" },
  { sid: "10095", name: "杨韫玉" },
]

MEMBERS.forEach(member => {
  [1, 2, 3, 4].forEach(index => {
    const filename = `${member.name}-${index}.jpg`;
    const url = URL_TEMPLATE.replace("$SID", member.sid).replace("$INDEX", index);
    http.get(url, function (response) {
      console.log("Downloading " + filename)
      response.pipe(fs.createWriteStream(filename));
    });
  });
});
