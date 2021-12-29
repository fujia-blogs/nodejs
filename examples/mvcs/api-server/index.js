const http = require('http');
const URL = require('url').URL;

const baseMongo = require('./mongodb/index')();

const server = http.createServer(async (req, res) => {
  const urlInstance = new URL(req.url, `http://${req.headers.host}`);

  const pathname = urlInstance.pathname;

  const paramStr = urlInstance;
  const param = querystring.parse(paramStr);

  if (pathname !== '/v1/user/infos') {
    return setResInfo(res, false, 'path not found', null, 404);
  }

  const userIds = urlInstance.searchParams.get('user_ids');

  if (!userIds) {
    return setResInfo(res, false, 'params error');
  }

  // 从 db 查询数据，并获取，有可能返回空数据
  const userInfo = await queryData({ id: { $in: userIds.split(',') } });
  return setResInfo(res, true, 'success', userInfo);
});

server.listen(7654, () => {
  console.log('server start http://127.0.0.1:7654');
});

async function queryData(queryOption) {
  const client = await baseMongo.getClient();

  const collection = client.db('nodejs_column').collection('user');

  const queryArr = await collection.find(queryOption).toArray();

  return queryArr;
}

function setResInfo(res, ret, message, dataInfo, httpStatus = 200) {
  let retInfo = {};
  if (!ret) {
    retInfo = {
      ret: -1,
      message: message ? message : 'error',
      data: {},
    };
  } else {
    retInfo = {
      ret: 0,
      message: message ? message : 'success',
      data: dataInfo ? dataInfo : {},
    };
  }
  res.writeHead(httpStatus, { 'Content-Type': 'text/plain' });
  res.write(JSON.stringify(retInfo));
  res.end();
  return;
}
