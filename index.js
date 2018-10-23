function* iterator() {
  let index = 0;
  while(true) {
    yield index++;
  }
}

let gen = iterator()
