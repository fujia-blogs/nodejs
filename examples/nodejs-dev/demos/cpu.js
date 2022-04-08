const http = require('http');

const server = http.createServer((req, res) => {
  let sum = 0;
  for (let i = 0; i < 10000000000; i++) {
    sum = sum + i;
  }
  res.write(`${sum}`);
  res.end();
});

server.listen(4000, () => {
  console.log('server start http://127.0.0.1:4000');
});
