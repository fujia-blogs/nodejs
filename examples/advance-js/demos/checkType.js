const _ = console.log;

// console.log(typeof null);

// console.log(typeof NaN);

// console.log(typeof document.all);

function log() {
  typeof a;

  let a = 10;
}

// log();

String.prototype.constructor = function fun() {
  return {};
};

// console.log('str'.constructor);

// underscore
function isUndefined(obj) {
  return obj === void 0;
}

const arr = [NaN];

// _(arr.indexOf(NaN));
// _(arr.includes(NaN));

function format_with_regex(num) {
  const reg = /\d{1,3}(?=(\d{3})+$)/g;

  return (num + '').replace(reg, '$&,');
}

_(format_with_regex(987654321));
