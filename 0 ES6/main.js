// ===================================
// ES6
// ===================================

// ===================================
// ===================================
// ===================================
// Variables And Scope
// ===================================
// ===================================
// ===================================

// Var
// => var is a function scope
// => var is not a block scope

// ==================

// // => var is a function scope

// function func() {
//   var title = "ziad";
// }

// func();

// console.log(title); // Error: title is not defined

// ==================

// // => var is not a block scope

// var myName = "ziad";
// var time = 5;

// if (time === 5) {
//   var myName = "ali";
// }

// console.log(myName); // ali

// ==================

// // => var is not a block scope

// var i = "ziad";

// for (var i = 0; i <= 11; i++) {
//   //
// }

// console.log(i); // 12

// ==================

// // var take place in global scope (window)

// var mymyName = "ziad";

// console.log(window.mymyName); // ziad

// ==================

// // can re declearation

// var myName = "ali";
// var myName = "ziad";

// console.log(myName); // ziad

// ==================

// // Hoisting

// console.log(myName); // undefined

// var myName = "ali";

// console.log(myName); // ali

// ===================================

// Let Const

// ==================

// // let => can re assign
// // const => can not re assign

// let num1 = 5;
// num1 = 10;
// console.log(num1); // 10

// const num2 = 5;
// num2 = 10;
// console.log(num2); // Error

// ==================

// // let, const => function scope

// function func() {
//   let title = "ziad";
// }

// func();

// console.log(title); // Error: title is not defined

// ==================

// // let, const block scope

// let myName = "ziad";
// let time = 5;

// if (time === 5) {
//   let myName = "ali";
// }

// console.log(myName); // ziad

// ==================

// // let, const block scope

// let i = "ziad";

// for (let i = 0; i <= 11; i++) {
//   //
// }

// console.log(i); // ziad

// ==================

// // var do not take place in global scope (window)

// let myName = "ziad";

// console.log(window.myName); // undefined

// ==================

// // can not re declearation in same scope

// let myName = "ali"; // Error
// let myName = "ziad"; // Error

// console.log(myName); // Error

// {
//   let title = "dalia";
//   console.log(title); // dalia
// }

// {
//   let title = "soha";
//   console.log(title); // soha
// }

// ==================

// // Hoisting

// console.log(myName); // Error

// let myName = "ali";

// console.log(myName); // ali

// ===================================
// ===================================
// ===================================
// Primative Types & Refrence Types
// ===================================
// ===================================
// ===================================

// Primative Types
// => undefined
// => boolean
// => number
// => string
// => bigInt
// => symbole

// Refrence Types
// => object
// => array
// => function
// => date

// ==================

// Primative Types
// console.log(typeof 2); // number
// console.log(typeof true); // boolean
// console.log(typeof "string"); // string
// console.log(typeof undefined); // undefined

// Refrence Types
// console.log(typeof {}); // object
// console.log(typeof []); // object
// console.log(typeof null); // object
// console.log(typeof function func() {}); // function

// ==================

// console.log("" == ""); // true
// console.log(undefined == undefined); // true
// console.log(null == null); // true

// console.log({} == {}); // false
// console.log([] == []); // false
// console.log(function func() {} == function func() {}); // false

// ==================

// // Refrence Types => has mehods
// // Refrence Types => are mutible

// let arr = ["ziad"];

// arr.push("ahmed"); // method
// console.log(arr); // ["ziad", ahmed]

// arr[0] = "ali"; // mutible
// console.log(arr); // ["ali", ahmed]

// ==================

// // Primative Types => has no methods
// // Primative Types => are immutible

// let myName = "ziad";

// myName = "ali"; // re assign not mutible (immutible)

// myName[0] = "a"; // nothing // immutible // primative

// console.log(myName); // ali

// myName.push("asd"); // error // has no methods

// ==================

// // Note
// // String store in memory as an array

// let myName = "ziad";

// console.log(myName.length); // 4 // method

// ==================

// // Primative Type
// // Pass By Value

// let nameOne = "ziad";

// nameTwo = nameOne;

// console.log(nameOne); // ziad
// console.log(nameTwo); // ziad

// nameOne = "ayman";

// console.log(nameOne); // ayman
// console.log(nameTwo); // ziad

// ==================

// // Refrence Type
// // Pass By Refrence

// let namesOne = ["ziad", "ali"];

// namesTwo = namesOne;

// console.log(namesOne); // ["ziad", "ali"]
// console.log(namesTwo); // ["ziad", "ali"]

// namesOne.push("ayman");

// namesTwo[0] = "sami";

// console.log(namesOne); // ["sami", "ali", "ayman"]
// console.log(namesTwo); // ["sami", "ali", "ayman"]

// ==================

// // Copy Object

// let namesOne = ["ziad", "ali"];

// // let namesTwo = Object.assign([], namesOne);
// // OR
// let namesTwo = [...namesOne];

// console.log(namesOne); // ["ziad", "ali"]
// console.log(namesTwo); // ["ziad", "ali"]

// namesOne.push("ayman");

// console.log(namesOne); // ["ziad", "ali", "ayman"]
// console.log(namesTwo); // ["ziad", "ali"]

// namesTwo[0] = "ahmed";

// console.log(namesOne); // ["ziad", "ali", "ayman"]
// console.log(namesTwo); // ["ahmed", "ali"]

// ===================================
// ===================================
// ===================================
//  This (Arrow Function)
// ===================================
// ===================================
// ===================================

// // Class (old) // Problem

// function Person() {
//   this.age = 5;
//   console.log(this); // Person {age: 5}

//   setInterval(function increment() {
//     let newAge = this.age++;
//     console.log(this); // window
//     console.log(newAge); // Nan
//   }, 1000);
// }

// let personOne = new Person();

// ==================

// // Class (old) // Solve Problem (old way)

// function Person() {
//   this.age = 5;

//   var thisClass = this;

//   setInterval(function increment() {
//     let newAge = thisClass.age++;
//     console.log(newAge); // 1, 2, 3, ....
//   }, 1000);
// }

// let personOne = new Person();

// ==================

// // Class (old) // Solve Problem (new way) (Arrow Function)

// function Person() {
//   this.age = 5;

//   setInterval(() => {
//     let newAge = this.age++;
//     console.log(newAge); // 1, 2, 3, ....
//   }, 1000);
// }

// let personOne = new Person();

// ===================================
// ===================================
// ===================================
//  Rest Operator (...)
// ===================================
// ===================================
// ===================================

// function func(fName, lName, ...rest) {
//   console.log(fName);
//   console.log(lName);
//   console.log(rest); // [25, "egypt"]
// }

// func("ziad", "ahmed", 25, "egypt");

// ===================================
// ===================================
// ===================================
//  Destructuring [] Rest (...)
// ===================================
// ===================================
// ===================================

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const [num1, , ...nums] = numbers;

// console.log(num1); // 1
// console.log(nums); // [3, 4, 5, 6, 7, 8, 9]

// ==================

// function fullName() {
//   return ["ziad", "ahmed", "mahmoud"];
// }

// const [fName, sName, lName] = fullName();

// console.log(fName); // ziad
// console.log(sName); // ahmed
// console.log(lName); // mahmoud

// const [, ...params] = fullName();
// console.log(params); // ["ahmed", "mahmoud"]

// ==================

// let a = 50;
// let b = 100;

// [a, b] = [b, a];

// console.log(a, b); // 100, 50

// ===================================
// ===================================
// ===================================
//  Destructuring {} Rest (...)
// ===================================
// ===================================
// ===================================

// const user = { name: "ziad", age: 25, address: "sohag", job: "dev" };

// const { name: fName, age: theAge = 0, asd = "asd", ...params } = user;

// console.log(fName); // ziad
// console.log(theAge); // 25
// console.log(asd); // asd
// console.log(params); // {address: "sohag", job: "dev"}

// ===================================
// ===================================
// ===================================
//  Destructuring [] {} Advanced
// ===================================
// ===================================
// ===================================

// const userData = {
//   persons: [
//     { name: "ziad", age: 25 },
//     { name: "ali", age: 30, address: ["sohag", "cairo"] },
//   ],
// };

// // const { persons, persons: [
// //     { name, age },
// //     { name: sName, age: sAge, address: [add1, add2], address }
// // ]} = userData;

// const { persons } = userData;
// const [item1, item2] = persons;
// const { name, age } = item1;
// const { name: sName, age: sAge, address } = item2;
// const [add1, add2] = address;

// console.log(persons); // [{},{}]
// console.log(name, age); // ziad // 25
// console.log(sName, sAge, address, add1); // ali // 30 // ["sohag", "cairo"] // sohag

// ==================

// const obj = { name: "ziad", age: 25, address: "sohag" };
// const arr = ["ziad", 25, "sohag"];

// function objFunc({ name, age: myAge, address, asd = "asd" }) {
//   console.log(name, myAge, address, asd); // ziad 25 sohag asd
// }
// function arrFunc([name, , address, asd = "asd"]) {
//   console.log(name, address, asd); // ziad sohag asd
// }

// objFunc(obj);
// arrFunc(arr);

// ==================

// const data = {
//   1: { name: "ziad", age: 25 },
//   2: { name: "ali", age: 30 },
//   3: { name: "mohamed", age: 82 },
// };

// console.log(data);

// Object.values(data).forEach((el) => {
//   console.log(el.name, el.age);
// });

// Object.keys(data).forEach((key) => {
//   console.log(key, data[key]["name"], data[key]["age"]);
// });

// console.log(data);

// ==================

// const numbers = [10, 20, 30];

// const newNumbers = [];

// // numbers.forEach((el, idx) => (newNumbers[idx] = el * 2));
// numbers.forEach((el) => newNumbers.push(el * 2));

// console.log(newNumbers); // [20, 40, 60]

// ==================

// const numbers = [10, 20, 30];

// const newNumbers = numbers.map((el) => el * 2);

// console.log(newNumbers); // [20, 40, 60]

// ==================

// const numbers = [5, 10, 15, 20];

// const newNumbers = numbers.map((el) => (el % 2 === 0 ? el * 2 : el));

// console.log(newNumbers); // [5, 20, 15, 40]

// ==================

// const data = {
//   1: { name: "ziad", age: 25 },
//   2: { name: "ali", age: 30 },
//   3: { name: "mohamed", age: 82 },
// };

// const result = Object.values(data).map(({ name }) => "#" + name + "#");

// console.log(result); // ['#ziad#', '#ali#', '#mohamed#']

// ==================

// const arr = [1, 2, 3, 4];

// const res = arr.filter((el) => el !== 2 && el !== 3);

// console.log(res); // [1, 4]

// ==================

// const data = [
//   { name: "ziad", age: 25 },
//   { name: "ali", age: 30 },
//   { name: "mohamed", age: 82 },
// ];

// const res = data.filter((item) => item.age >= 40);

// console.log(res); // [ {name: "mohamed", age: 82 } ]

// ===================================
// ===================================
// ===================================
//  Sort
// ===================================
// ===================================
// ===================================

// const abc = ["x", "a", "z"];
// console.log(abc.sort()); // ["a", "x", "z"]

// const _123 = [9, 2, 5];
// console.log(_123.sort()); // [2, 5, 9]

// ==================

// // ** Note **
// const _123_ = [100, 10, 1000, 30];
// console.log(_123_.sort()); // [10, 100, 1000, 30]

// // 10 - 12 = -2 => negative => second num is bigger
// // 12 - 10 = 2 => positive => first num is bigger

// const _123__ = [100, 10, 1000, 30];
// console.log(_123__.sort((a, b) => a - b)); // [10, 30, 100, 1000]
// console.log(_123__.sort((a, b) => b - a)); // [1000, 100, 30, 10]

// ==================

// const data = [
//   { name: "ziad", age: 5 },
//   { name: "ali", age: 15 },
//   { name: "mohamed", age: 82 },
//   { name: "asad", age: 55 },
//   { name: "mosa", age: 22 },
//   { name: "asmaa", age: 100 },
// ];

// // const res = data.sort((a, b) => a.age - b.age);

// // const res = data.sort((a, b) => a.age - b.age).slice(0, 5);

// // const res = data
// //   .sort((a, b) => a.age - b.age)
// //   .slice(0, 5)
// //   .filter((el) => el.age !== 82);

// const res = data
//   .sort((a, b) => a.age - b.age)
//   .slice(0, 5)
//   .filter((el) => el.age !== 82)
//   .map((el) =>
//     el.age <= 9
//       ? { ...el, age: "0" + el.age }
//       : { ...el, age: el.age.toString() }
//   );

// console.log(res);

// // ==================

// const data = [
//   { name: "ziad", age: 5 },
//   { name: "ali", age: 15 },
//   { name: "mohamed", age: 82 },
//   { name: "asad", age: 55 },
//   { name: "mosa", age: 22 },
//   { name: "asmaa", age: 100 },
// ];

// const find = data.find((el) => el.age > 20);
// console.log(find); // { name: "mohamed", age: 82 }

// const filter = data.filter((el) => el.age > 20);
// console.log(filter);

// const findAll = data.findIndex((el) => el.age > 20);
// console.log(findAll); // 2

// ==================

// ===================================
// ===================================
// Shoping Cart
// ===================================
// ===================================

let cart = [];

const addToCart = (addedItem) => {
  const findedItem = cart.find((el) => el.id === addedItem.id);

  if (findedItem) {
    cart = cart.map((item) => {
      if (item.id === addedItem.id) {
        return { ...item, quantity: item.quantity + addedItem.quantity };
      } else {
        return item;
      }
    });
  } else {
    cart = [...cart, addedItem];
  }
};

const deleteFromCart = (id) => {
  cart = cart
    .map((item) => {
      if (item.id === id) {
        if (item.quantity <= 1) {
          return null;
        } else {
          return { ...item, quantity: item.quantity - 1 };
        }
      } else {
        return item;
      }
    })
    .filter((item) => item !== null);
};

const clearCart = () => {
  cart = [];
};

addToCart({ id: 1, quantity: 2 });
addToCart({ id: 2, quantity: 1 });
addToCart({ id: 2, quantity: 1 });

addToCart({ id: 3, quantity: 3 });
deleteFromCart(3);

addToCart({ id: 4, quantity: 2 });
deleteFromCart(4);
deleteFromCart(4);

// clearCart();

console.log(cart);

const fullInfo = [
  { id: 1, name: "phone" },
  { id: 2, name: "mobile" },
  { id: 3, name: "pc" },
  { id: 4, name: "laptob" },
  { id: 5, name: "tablet" },
];

cartInfo = cart.map((el) => {
  const cartItem = fullInfo.find((item) => item.id === el.id);
  return { id: el.id, quantity: el.quantity, name: cartItem.name };
});

console.log(cartInfo);

// ===================================
// ===================================
// ===================================
// ===================================
// ===================================
// ===================================
// ===================================
// ===================================
