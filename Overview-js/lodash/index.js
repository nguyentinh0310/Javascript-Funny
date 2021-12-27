const _ = require("lodash");

let arr = ["Tỉnh", "Nghĩa", "Mạnh"];
// es6
console.log(arr.join("-"));
// lodash
console.log(_.join(arr, "*"));
// find

console.log(_.find(arr, (item) => item === "Tỉnh"));
// _.first(array): Lấy phần tử đầu tiên trong mảng
console.log("FristItem: ", _.first(arr)); //Tỉnh

// _.last(array): Lấy phần tử cuối cùng trong mảng
console.log("LastItem: ", _.last(arr)); //mạnh

// _.chunk(array,[size=option]): Tạo một mảng mới từ mảng đã có, gồm các mảng con có có số phần tử tùy chọn truyền vào
const info = ["id", 1, "name", "front-end"];
console.log(_.chunk(info, 2)); //[ [ 'id', 1 ], [ 'name', 'front-end' ] ]
const arrString = [  "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10", "a11", "a12", "a13",];
console.log(_.chunk(arrString, 3));

// _fill(array, param): Ghi đè phần tử param vào tất cả các phần tử trong mảng
const array = (1, 2, 3);
console.log(_.fill(array, "A")); //('A', 'A', 'A']
console.log(_.fill(array, 10)); // => [10, 10, 10]

// _fill(array, param, start, end-1): Chèn phần tử từ vị trí start đến vị trí end - 1
console.log(_.fill([1, 2, 3, 4], "*", 1, 4)); //[1, "*", "*","*"]

// _.size( array | object): Trả về số phần tử trong mảng hoặc số thuộc tính trong object
const arr2 = [
  { id: 1, name: "iphone", price: 1000 },
  { id: 2, name: "iphone X", price: 2000 },
  { id: 3, name: "iphone XS", price: 3000 },
];
console.log("arr2 size", _.size(arr2)); // => 3

const object = {
  id: 1,
  name: "iphone",
  price: 1000,
};
console.log("object size", _.size(object)); // = 3

// _.sortBy(collection, [iteratees=[_.identity]]) Hàm này chắc bạn cũng đoán được, nó dùng để sắp xếp collection theo điều kiện xác định.
const users = [
  { name: "fred", age: 48 },
  { name: "kaito", age: 36 },
  { name: "kaito", age: 39 },
  { name: "bake", age: 40 },
  { name: "juld", age: 34 },
];
const result_sortByage = _.sortBy(users, [(item) => item.age]); //sort theo age
console.log("result_sortByAge", result_sortByage);
let result2 = _.sortBy(users, ["name", "age"]); //sort theo name trước sau đó sort theo age
console.log("result2", result2);

// _.includes() : Kiểm tra xem các giá trị ta truyền vào có nằm trong collection hay không.
console.log(_.includes([1, 2, 3], 1)); // -> true
console.log(_.includes([1, 2, 3], 1, 2)); // => false
console.log(_.includes({ a: 1, b: 2 }, 1)); // => true
console.log(_.includes("abcd", "bc")); // => true

// _.unig(arr) : Loại bỏ các phần tử kiểu dữ liệu nguyên thuỷ (shallow compare) trùng nhau.
console.log(_.uniq([1, 2, 2, 2, 4, 5, 6]));
// uniqBy(arr, iteratee=_identity): Loại bỏ các phần tử object trung nhau theo 1 tiêu chí nào đó
const arr3 = [
  { id: "1", name: "iphoneX", price: 1000 },
  { id: "2", name: "iphonexS", price: 2000 },
  { id: "3", name: "iphoneXS Max", price: 3000 },
  { id: "3", name: "iphoneXS Max", price: 3000 },
  { id: "3", name: "iphoneXS Max", price: 3000 },
  { id: "5", name: "iphone Pro", price: 4000 },
  { id: "4", name: "iphone Pro MAX", price: 5000 },
];
console.log("result", _.uniqBy(arr3, "id"));


// _.flatten(array): là hàm dùng để phân tách các mảng trong mảng 1 cấp
console.log('_.flatten', _.flatten([[1, [2, [3, [4]], 5]]])); //[2, [2, [3,4]], 5]

// _.flattenDeep(array): là hàm dùng để phân tách tất cả các mảng trong mảng nhiều cấp
console.log('_.flattenDeep', _.flattenDeep([[1, [2, [3, [4]], 5]]]));  //[1, 2, 3, 4, 5]


// Compare 2 array: Các hàm tổng hợp để so sánh 2 array giống nhau hay khác nhau
const array1 = [['a', 'b'], ['b', 'c']];
const array2 = [['b', 'c'], ['a', 'b']];
console.log('Compare 2 array',_.isEqual(array1.sort(), array2.sort())); //true


const arrObject1 =[{id:1,name: 'Khai'},{id: '2',name: 'Minh'}]
const arrObject2= [{id:1,name: 'Khai'},{id: '2',name: 'Hang'},{id: '3',name: 'Minh'}];
console.log('Compare array obj', _.differenceWith(arrObject2, arrObject1, _.isEqual))

// _.isEqual(objectA, objectB): So sánh 2 object giống hay khác nhau.
const objectA = {coin: 'DOGE'};
const objectB = {coin: 'DOGE'};
const objectC = {coin: 'BTC'};
console.log(_.isEqual(objectA, objectB)); // true
console.log(_.isEqual(objectA, objectC)); // false


// _.has(object, path): Kiểm tra xem path có phải là thuộc tính trực tiếp của đối tượng hay không.
const object2 = { 'a': { 'b': 2 } };
const other = _.create({ 'a': _.create({ 'b': 2 }) });
console.log(_.has(object2, 'a'))// => true
console.log(_.has(object2, 'a.b'))// => true
console.log(_.has(object2, ['a','b']))// => true
console.log(_.has(other, 'a'))// => false
