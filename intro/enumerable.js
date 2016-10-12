Array.prototype.myEach = function(callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i]);
  }
}

Array.prototype.myMap = function(callback) {
  let answer = [];
  this.myEach(el => {
    answer.push(callback(el));
  });
  return answer;
}

Array.prototype.myInject = function(callback) {
  let answer = this[0];
  this.slice(1).myEach(el => {
    answer = callback(answer, el);
  });
  return answer;
}
