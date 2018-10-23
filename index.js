function* iterator() {
  let index = 0;
  while(true) {
    yield index++;
  }
}

let gen = iterator()



function* promiseArr(arr) {
  let idx = 0; 
  while (idx < arr.length) {
    yield arr[idx]
    idx++;
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
// gen2.next().value().then((() => {
//   gen2.next().value()
// }))

async function trial(arr) {
  for (let i=0; i<arr.length; i++) {
    await arr[i]()
  }
}


let nums = [12,2,2,3,4]


function doIt(promiseArr) {
  return promiseArr.reduce(function(acc, prom) {
    return acc.then(results => {
        return prom()
    });
  }, Promise.resolve([]));
} 

doIt([prom1, prom2, prom3, prom1])

// console.log(test)
// trial([prom1, prom2, prom3])

// let result = {done: false}
// while (!result.done) {
//   result = gen2.next()
// }
// console.log(result.done)
