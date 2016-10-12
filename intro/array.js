Array.prototype.uniq = function() {
  let answer = [];
  this.forEach(el => {
    if (answer.indexOf(el) === -1) {
      answer.push(el);
    }
  });
  return answer;
}

Array.prototype.twoSum = function(target) {
  for (let i = 0; i < this.length; i++) {
    for (let j = i + 1; j < this.length; j++) {
      if (this[i] + this[j] === target) return true;
    }
  }
  return false;
}

Array.prototype.transpose = function() {
  let transposedArray = [];
  for (let i = 0; i < this.length; i++) {
    let row = [];
    for (let j = 0; j < this[i].length; j++) {
      row.push(this[j][i]);
    }
    transposedArray.push(row);
  }
  return transposedArray;
}
