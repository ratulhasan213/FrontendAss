var arr = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];


for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[i] < arr[j]) {
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}

console.log(arr[arr.length-1]);
