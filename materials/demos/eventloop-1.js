const fs = require("fs");
const path = require("path");

function sleep(secs) {
  const start = new Date().getTime();

  while (true) {
    const end = new Date().getTime();

    if (end - start > secs * 1000) {
      break;
    }
  }
}

// new event loop starting point
setTimeout(() => {
  console.log("1");
  sleep(5);
  console.log("sleep 5s");
}, 10);

setImmediate(() => {
  console.log("setImmediate1");
});

// it will execute in the pending callbacks stage of new event loop
fs.readFile(
  path.resolve(__dirname, ".env"),
  {
    encoding: "utf-8",
  },
  (err, data) => {
    if (err) throw err;
    // console.log(data.toString());
    console.log("reade .env successful");
  }
);

// it will execute in the first event loop
Promise.resolve().then(() => {
  console.log("poll callback");
});

process.nextTick(() => {
  console.log("nextTick callback");
});

// executed in the first event loop
console.log("2");
