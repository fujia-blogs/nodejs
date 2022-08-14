const isObject = (val) =>
  val !== null && (typeof val === 'object' || typeof val === 'function');

export default function isPromise(value) {
  return (
    value instanceof Promise ||
    (isObject(value) &&
      typeof value.then === 'function' &&
      typeof value.catch === 'function')
  );
}
