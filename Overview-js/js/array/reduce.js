// reduce(arr, callbackFn, initialValue)
// arr should be an array and callbackEn should be a function
// arr.length = 0 and initialValue === undefined -> throw error
// arr.length 0 and initialValue !== undefined → return initialValue

function reduce(arr, callbackFn, initialValue) {
  if (!Array.isArray(arr) || typeof callbackFn !== "function") {
    throw new Error("Invalid parameter");
  }

  const hasInitialValue = initialValue !== undefined;
  let startIndex = hasInitialValue ? 0 : 1;
  let accumulator = hasInitialValue ? initialValue : arr[0];

  //  loop
  for (let i = startIndex; i < arr.length; i++) {
    accumulator = callbackFn(accumulator, arr[i], i);
  }

  return accumulator;
}

function calcSum(prevSum, number) {
  return prevSum + number;
}

console.log(reduce([1,2,3,4,5], calcSum));
/***********************************************************/

const arr = [1, 2, 2, 1, 2, 1, 4];

const result = arr.reduce((acc, item) => {
  if (acc[item]) {
    acc[item]++;
  } else {
    acc[item] = 1;
  }
  return acc;
}, {});
console.log(result)

const output = Object.keys(result).map((val) => {
  return {
    number: val,
    count: result[val],
  };
});

console.log(output);
