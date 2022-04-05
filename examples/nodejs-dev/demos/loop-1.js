const fs = require('fs');

setTimeout(() => {
  console.log('1');
}, 500);

setImmediate(() => {
  console.log('setImmediate 1');
});

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

// 首次事件循环中执行
Promise.resolve().then(() => {
  console.log('poll callback');
});

console.log('2');
