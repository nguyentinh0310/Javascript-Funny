// Mảng
const a = "a";
const b = "b";
const c = "c";
const d = "d";
// 2 cách tạo mảng
// array literal
// const students1 = ["Tinh", "tuan", "nam", "thanh", "trung"];
// array constructor
const students2 = new Array();
// Ví dụ một mảng
// Mảng phức tạp [0, false, undefined, null, "Tinh", ["Tinh", false, 1200, []] ]
// Mảng đơn giản [0, false, undefined, null, "Tinh"]
// index: chạy từ 0
// length: đếm từ 1
console.log(students1.length); // 5
// Truy xuất giá trị trong mảng qua index với cú pháp arrayName[index]
console.log(students1[0]);
console.log(students1[3]);
// Nếu không có vị trí index thì trả về undefined
console.log(students1[5]);
// lấy phần tử cuối cùng trong mảng, length của mảng - 1
console.log(students1[students1.length - 1]);
students1.length = 0;
console.log(students1);
// []: empty array, mảng rỗng
// Phương thức hay dùng của mảng nên biết
const students1 = ["Tinh", "tuan", "nam", "thanh", "trung", "tuan"];
// arrayName.method
// length -> trả về độ dài của mảng
console.log("-----array.length-----");
console.log(students1.length);
// reverse -> Đảo ngược giá trị trong mảng
console.log("-----array.reverse-----");
console.log(students1.reverse());
// join -> nối các phần tử trong mảng thành chuỗi
console.log("-----array.join-----");
// separator: "" " " "_" "-"
console.log(students1.join(" "));
// includes -> Kiểm tra phần tử nào đó có trong mảng hay không?
console.log("-----array.includes-----");
console.log(students1.includes("Tinh")); // true
console.log(students1.includes("tinh2")); // false


const students1 = ["Tinh", "tuan", "nam", "thanh", "trung", "tuan"];

// indexOf -> trả về vị trí của phần tử tìm thấy đầu tiên
console.log("-----array.indexOf-----");
console.log(students1.indexOf("tuan"));
// lastIndexOf -> trả về vị trí của phần tử tìm thấy cuối cùng
console.log("-----array.lastIndexOf-----");
console.log(students1.lastIndexOf("tuan"));
// push -> thêm phần tử vào cuối mảng
console.log("-----array.push-----");
console.log(students1.push("javascript"));
console.log(students1);
// unshift -> thêm phần tử vào đầu mảng
console.log("-----array.unshift-----");
console.log(students1.unshift("Frontend"));
// pop -> xoá phần tử cuối cùng trong mảng
console.log(students1);
students1.pop();
console.log(students1);
// shift -> xoá phần tử đầu tiên trong mảng
console.log(students1);
students1.shift();
console.log(students1);
