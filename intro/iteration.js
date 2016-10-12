Array.prototype.bubbleSort = function() {
  let unsorted = true;
  while (unsorted) {
    unsorted = false;
    for (let i = 0; i < this.length - 1; i++) {
      if (this[i] > this[i+1]) {
        unsorted = true;
        let a = this[i];
        this[i] = this[i+1];
        this[i+1] = a;
      }
    }
  }
}

String.prototype.substrings = function() {
  let substrings = [];

  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length + 1; j++) {
      substrings.push(this.slice(i, j));
    }
  }

  return substrings;
}
