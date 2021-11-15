// Declaration, new, this, method, caution
let student = {
  name: "Tinh",
  age: 21,
};

// Constructor function Person Student
function Student(name, age) {
  // this = {}
  // add properties to this
  this.name = name;
  this.age = age;

  this.getName = function () {
    return `your name is ${this.name} - age: ${this.age}`;
  };
  // return this
}
let student2 = new Student("john", 40);

console.log(student2.getName());
// Prototype
