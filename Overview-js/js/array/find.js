// find(callbackFn)
// find(x => x > 0)

// lính canh
// v1
function findFirstEven(numberList) {
  if (!Array.isArray(numberList)) return;
  let firstEven; // underfinde

  for (let i = 0; i < numberList.length; i++) {
    const number = numberList[i];
    if (number % 2 === 0) {
      firstEven = number;
      break;
    }
  }
  return firstEven;
}
console.log(findFirstEven([1, 2, 3, 4, 5]));

/**********************************************/

// v2
function findFirstEven(numberList) {
  if (!Array.isArray(numberList)) return;

  for (let i = 0; i < numberList.length; i++) {
    const number = numberList[i];
    if (number % 2 === 0) {
      return number;
    }
  }
}
console.log(findFirstEven([1, 2, 3, 4, 5]));

/**********************************************/

// v3
function findFirstEven(numberList, callbackFn) {
  if (!Array.isArray(numberList)) return;

  for (let i = 0; i < numberList.length; i++) {
    const number = numberList[i];
    if (callbackFn(number, i)) {
      return number;
    }
  }
}

function isEven(number) {
  return number % 2 === 0;
}
console.log(findFirstEven([1, 2, 3, 4, 5], isEven));
console.log(findFirstEven([1, 2, 3, 4, 5], (number) => number > 3));
