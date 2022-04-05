const sleep = (n) => {
  const start = new Date().getTime();

  while (true) {
    if (new Date().getTime() - start > n) break;
  }
};

module.exports = {
  sleep,
};
