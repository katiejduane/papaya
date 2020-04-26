export function getRandom(num) {
  return Math.floor(Math.random() * num);
}

export function getIndex(arr) {
  let randomNum = getRandom(arr.length);
  return arr[randomNum];
}

export function getNewOption(oldOption, arr) {
  newOption = getIndex(arr);
  if (newOption === oldOption) {
    newOption = getIndex(arr);
  }
  return newOption;
}
