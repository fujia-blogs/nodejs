class MyArray {
  get [Symbol.toStringTag]() {
    return 'MyArray';
  }
}

const myT = new MyArray();

console.log(Object.prototype.toString.call(myT));
