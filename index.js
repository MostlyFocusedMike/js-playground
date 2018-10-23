function* iterator() {
  let index = 0;
  while(true) {
    yield index++;
  }
}

let gen = iterator()

function* arrIt(arr) {
  let idx = 0; 
  while (idx < arr.length) {
    yield arr[idx];
    idx++;
  }
}






var progress = (function () {
  let counter = 0;
  return function () {
    counter += 1; 
    console.log(counter)
  }
})();


function* promiseArr(arr) {
  let idx = 0; 
  while (idx < arr.length) {
    yield idx;
    arr[idx]()
      .then(() => {
        console.log("hello")
        idx++;
      })
  }
}

function* singlePromise(prom) {
  prom()
    .then(console.log);
}

const prom1 = function() {
  return new Promise((resolve, reject) => {
    let counter = 0;
    let amount = setInterval(() => {
      console.log(counter++)
      if (counter === 5) {
        clearInterval(amount)
        resolve("done")
      }
    }, 1000)
  })
}

const prom2 = function() {
  return new Promise((resolve, reject) => {
    let counter = 5;
    let amount = setInterval(() => {
      console.log(counter++)
      if (counter === 10) {
        clearInterval(amount)
        resolve("done")
      }
    }, 1000)
  })
}

const prom3 = function() {
  return new Promise((resolve, reject) => {
    let counter = 10;
    let amount = setInterval(() => {
      console.log(counter++)
      if (counter === 15) {
        clearInterval(amount)
        resolve("done")
      }
    }, 1000)
  })
}

let gen2 = promiseArr([prom1, prom2, prom3])
gen2.next()

// let result = {done: false}
// while (!result.done) {
//   result = gen2.next()
// }
// console.log(result.done)

// setInterval(progress, 1000);