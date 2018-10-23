function progress(time) {
  return function() {
    return new Promise((resolve, reject) => {
      let counter = 1;
      let amount = setInterval(() => {
        console.log(counter++)
        if (counter === 5) {
          clearInterval(amount)
          resolve('') // each promise must actually resolve, however this value is never used 
        }
      }, time)
    })
  }
}

function loadEmUp(promiseArr) {
  return promiseArr.reduce((acc, prom) => acc.then(() => prom()), Promise.resolve(''));
} 

loadEmUp([progress(50), progress(500), progress(200), progress(1000)])