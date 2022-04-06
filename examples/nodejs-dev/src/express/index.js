const express = require('express');

const app = express();

const port = 3001;

app.listen(port, () => console.log(`Example app is running on port ${port}`));

app.use(async (req, res, next) => {
  console.log('first');
  await next();
  console.log('first end');
});

app.use((req, res, next) => {
  console.log('second');
  next();
  console.log('second end');
});

app.use(async (req, res, next) => {
  console.log('async');
  await next();

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('wait 1000ms end');
      resolve();
    }, 1000);
  });

  console.log('async end');
});

app.use((req, res, next) => {
  console.log('third');
  next();
  console.log('third end');
});

app.get('/', (req, res) => res.send('Hello world'));
