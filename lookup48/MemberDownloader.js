const http = require('http');
const fs = require('fs');

const API_END_POINTS = [
  { name: "SNH48", url: "http://h5.snh48.com/resource/jsonp/members.php?gid=10" },
  { name: "BEJ48", url: "http://h5.snh48.com/resource/jsonp/members.php?gid=20" },
  { name: "GNZ48", url: "http://h5.snh48.com/resource/jsonp/members.php?gid=30" },
  { name: "SHY48", url: "http://h5.snh48.com/resource/jsonp/members.php?gid=40" },
  { name: "CKG48", url: "http://h5.snh48.com/resource/jsonp/members.php?gid=50" },
  { name: "IDFT", url: "http://h5.snh48.com/resource/jsonp/members.php?gid=70" },
]

const members = [];

Promise.all(API_END_POINTS.map(getMembersWithTwoTries))
  .then(() => {
    console.log(`Download complete. We found ${members.length} members in total.`);
    members.sort((a, b) => a.abbr > b.abbr ? 1 : -1);
    return members.map(m => {
      // return `${m.sname} (${m.abbr}) - ${m.pname}: Team ${m.tname}`
      const o = {}
      o.name = m.sname
      o.abbr = m.abbr
      o.group = m.pname
      o.team = m.tname
      return o;
    });
  })
  .then((data) => {
    output = JSON.stringify({ "last-update": Date.now(), data: data });
    output = output.replace("[", "[\n").replace(/\},/g, "},\n").replace(/idft/g, "IDFT");
    fs.writeFile("./output.json", output, (err) => {
      console.log(`Saving to file ${err ? 'failed' : 'successful'}.`)
    });
  })
  .catch((err) => {
    console.log(err)
  });

function getMembersWithTwoTries({ name, url }) {
  return new Promise((resolve, reject) => {
    getMembers({ name, url })
      .then(() => {
        console.log("Success on first try: ", name);
        resolve();
      })
      .catch(() => {
        getMembers({ name, url }).then(() => {
          console.log("Success on second try: ", name);
          resolve();
        }).catch(() => {
          console.log("Fail after both tries: ", name);
          reject();
        });
      });
  });
}

function getMembers({ name, url }) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let json = '';
      res.on('data', (data) => { json += data });
      res.on('end', () => {
        try {
          result = JSON.parse(json);
          if (result.total != result.rows.length) {
            console.warn(`JSON claims ${result.total} members, but found ${result.rows.length}.`);
          }
          members.push(...result.rows);
          console.log(`Added ${result.rows.length} members in ${name}.`);
          resolve();
        } catch (err) {
          console.log(`Failed when parsing JSON for ${name} because ${err}.`);
          reject({ name, url });
        }
      });
    }).on('error', (err) => {
      console.log(`Failed when downloading ${name} because ${err}.`);
      reject({ name, url });
    });
  });
}