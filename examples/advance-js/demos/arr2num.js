const arr = ['1', '2', '3'];

// console.log(arr.map((i) => parseInt(i, 10)));
// console.log(arr.map(parseInt)); // => arr.map((val, index) => parseInt(val, indexs))

// console.log(null == 0);
// console.log('0' == false);

let print = console.log;

print(Object.getOwnPropertyDescriptor(global, 'null'));
print(Object.getOwnPropertyDescriptor(global, 'undefined'));
