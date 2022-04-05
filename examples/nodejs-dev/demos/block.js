const fs = require('fs');

const { sleep } = require('../src/utils');

setTimeout(() => {
  console.log('1');
  sleep(10000);
  console.log('sleep 10s');
}, 0);

// poll阶段执行
fs.readFile(
  './test.conf',
  {
    encoding: 'utf-8',
  },
  (err, data) => {
    if (err) {
      throw err;
    }

    console.log('read file success');
  }
);

console.log('2');
