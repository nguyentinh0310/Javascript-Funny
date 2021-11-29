function log() {
  console.log("tada");
}

function debounce(callback, wait) {
  let timeoutId;
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(callback, wait);
  };
}

const debounceLog = debounce(log, 500);

// gọi liên tục
debounceLog(); // 1 -> đợi 500ms
debounceLog(); // trigger 2 -> đợi 500ms  --> hủy 1
debounceLog(); // trigger 3 -> đợi 500ms  --> hủy 2 --> chỉ log(3)
// only log tada ONCE

// Throttle
function log() {
  console.log("tada");
}

function throttle(callback, wait) {
  let isThrottling = false;
  return function () {
    if (isThrottling) return; //2,3,4 cancel
    setTimeout(() => {
      callback();

      isThrottling = false;
    }, wait);

    isThrottling = true; //1
  };
}

const throttleLog = throttle(log, 500);

// 0 -> 500 => gọi đúng 1 lần
throttleLog(); //setTimeout 500s -> call --> turn off flag throtle
throttleLog(); // check throttling --> skip
throttleLog(); // check throttling --> skip
throttleLog(); // check throttling --> skip

// 600 -> 1100 => gọi đúng 1 lần
setTimeout(throttleLog, 600); //start throlling
setTimeout(throttleLog, 700); // ignore
setTimeout(throttleLog, 800); // ignore
