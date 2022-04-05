const http = require('http');
const rp = require('request-promise');

const server = http.createServer((req, res) => {
  Promise.all([startCount(), nextCount()]).then((value) => {
    let sum = value.reduce((prev, curr, idx, arr) => {
      return parseInt(prev) + parseInt(curr);
    });

    res.write(`${sum}`);
    res.end();
  });
});

async function startCount() {
  return await rp.get('http://127.0.0.1:9000');
}

async function nextCount() {
  return await rp.get('http://127.0.0.1:6000');
}

server.listen(4000, () => {
  console.log('server start http://127.0.0.1:4000');
});
