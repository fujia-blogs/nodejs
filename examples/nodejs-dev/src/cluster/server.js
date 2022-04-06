const http = require('http');

const server = http.createServer((req, res) => {
  res.write(`come from ${process.pid}`);
  res.end();
});

/**
 *
 * 启动服务
 */
server.listen(3000, () => {
  console.log('server start http://127.0.0.1:3000');
});
console.log(`Worker ${process.pid} started`);
