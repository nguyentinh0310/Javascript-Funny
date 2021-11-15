// 1. offsetWidth, offsetHeight, offsetLeft, offsetParent, offsetTop

const boxed = document.querySelector(".boxed");
console.log(boxed.offsetWidth); // độ rộng của phần tử
console.log(boxed.offsetHeight); // chiều cao của phần tử
console.log(boxed.offsetLeft); // vị trí của nó so với bên trái
console.log(boxed.offsetTop); // vị trí của nó so với phía trên
console.log(boxed.offsetParent); // lấy ra phần tử cha để lấy giá trị của phần tử cha
// 2. clientWidth, clientHeight, clientLeft, clientTop
console.log(boxed.clientWidth); // độ rộng của phần tử trừ đi border
console.log(boxed.clientHeight); // chiều cao của phần tử trừ đi border
console.log(boxed.clientLeft); //  vị trí của nó so với bên trái border
console.log(boxed.clientTop); //  vị trí của nó so với phía trên border
// 3. window.innerWidth, window.outerWidth, window.innerHeight, window.outerHeight
console.log(window.innerHeight);
console.log(window.outerHeight);
console.log(window.innerWidth);
console.log(window.outerWidth);

// 4. selector.getBoundingClientRect() -> lấy ra toạ độ, kích thước của phần tử
console.log(boxed.getBoundingClientRect());
// left, x: vị trí của khối so với bên trái
// top: vị trí của khối so với phía trên
// bottom: chiều cao của khối + top
// right: độ rộng của khối + left
// width: độ rộng
// height: chiều cao


// Sự khác nhau giữa Node List và HTML Collection
const li = document.getElementsByTagName("li"); // HTML Collection
const li2 = document.querySelectorAll("li"); // NodeList
console.log(li);
console.log(li2);
// Điểm giống: có thể truy cập bằng index, có độ dài(length), giống mảng nhưng ko hẳn là mảng tức là không sử dụng được những phương thức đã học như là pop, shift, push, map, filter
// HTML Collection: ko sử dụng được forEach
// NodeList: Sử dụng được forEach
for (let i = 0; i < li.length; i++) {
  console.log(li[i]);
}
// Sự khác nhau giữa parentNode và parentElement
// parentElement có thể null
// document.documentElement -> lấy thẻ html
console.log(document.documentElement.parentElement); // null
console.log(document.documentElement.parentNode); // #document
