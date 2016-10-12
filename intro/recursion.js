const range = function(start, end) {
  if (start > end) return [];
  return [start].concat(range(start + 1, end));
}

const exp1 = function(base, exponent) {
  if (exponent <= 0) return 1;
  return base * exp1(base, exponent - 1);
}

const exp2 = function(base, exponent) {
  if (exponent <= 0) return 1;
  if (exponent === 1) return base;
  if (exponent % 2 === 0) {
    let a = exp2(base, exponent / 2);
    return a * a;
  } else {
    let a = exp2(base, (exponent - 1) / 2);
    return a * a * base;
  }
}

const fibonacci = function(n) {
  if (n <= 0) return [];
  if (n === 1) return [1];
  if (n === 2) return [1, 1];
  let prevFib = fibonacci(n - 1);
  let len = prevFib.length;
  prevFib.push(prevFib[len - 1]+ prevFib[len - 2]);
  return prevFib;
}

Array.prototype.binarySearch = function(target) {
  let middle = Math.floor(this.length / 2);
  let value = this[middle];

  if (this.length === 0) return null;
  if (target === value) return middle;
  if (target < value) {
    return this.slice(0, middle).binarySearch(target);
  } else {
    let subSearch = this.slice(middle + 1).binarySearch(target);
    if (subSearch === null) return null;
    return subSearch + middle + 1;
  }
}

const makeChange = function(target, startingCoins = [10, 7, 1]) {
  let coins = startingCoins.sort((a, b) => b - a);
  if (target < coins[coins.length - 1]) return null;
  if (coins.indexOf(target) > -1) return [target];

  let bestChange = null;

  coins.forEach(coin => {
    let newCoins = coins.slice(coins.indexOf(coin));
    newCoins = newCoins.filter(newCoin => {
      newCoin <= target - coin
    });
    let nextChange = makeChange(target - coin, newCoins);

    let change = [coin].concat(nextChange);
    if (bestChange === null || change.length < bestChange.length) {
      bestChange = change;
    }
  });

  return bestChange;
}

Array.prototype.mergeSort = function() {
  if (this.length <= 1) return this
  let midPoint = Math.floor(this.length / 2);
  let leftArray = this.slice(0,midPoint);
  let rightArray = this.slice(midPoint);
  return merge(leftArray.mergeSort(), rightArray.mergeSort());
}

const merge = function(leftArray, rightArray) {

  let answer = [];
  while (leftArray.length > 0 && rightArray.length > 0) {
    if (leftArray[0] < rightArray[0]) {
      answer.push(leftArray.shift());
    } else {
      answer.push(rightArray.shift());
    }
  }
  return answer.concat(leftArray).concat(rightArray);
}

// console.log([1,3,2,4,2].mergeSort());

const subsets = function(array) {
  if (array.length <= 0) return [[]];
  let last = array.pop();
  let firstHalf = subsets(array);
  let secondHalf = [];
  firstHalf.forEach(subarray => {
    secondHalf.push(subarray.concat([last]));
  });
  return firstHalf.concat(secondHalf);
}

console.log(subsets([1, 2, 3]));
