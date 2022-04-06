const Koa = require('koa');

const app = new Koa();
const port = 3002;

app.use(async (ctx, next) => {
  console.log('first');
  await next();
  console.log('first end');
});
/**
 * 异步中间件
 */
app.use(async (ctx, next) => {
  console.log('async');
  await next();

  await new Promise((resolve) => {
    setTimeout(() => {
      console.log(`wait 1000 ms end`);
      resolve();
    }, 1000);

    console.log('async end');
  });
});

app.use(async (ctx) => {
  ctx.body = 'hello world';
});

app.listen(port, () =>
  console.log(`Example app listening on port
${port}`)
);
