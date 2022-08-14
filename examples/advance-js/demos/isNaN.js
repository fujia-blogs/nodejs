function isNaNVal(val) {
  return Object.is(val, NaN);
}

function isNaNVal(val) {
  return val !== val;
}

function isNaNVal(val) {
  return typeof val === 'number' && isNaN(val);
}

// polyfill
if (!('isNaN' in Number)) {
  Number.isNaN = function (val) {
    return typeof val === 'number' && isNaN(val);
  };
}
