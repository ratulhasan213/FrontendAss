var numbers = [1, 2, 3, 3, 4, 4, 5, 6, 7, 8, 9, 10];

for (let i = 0; i < numbers.length; i++) {
  for (let j = 0; j < numbers.length; j++) {
    if (numbers[i] < numbers[j]) {
      let temp = numbers[i];
      numbers[i] = numbers[j];
      numbers[j] = temp;
    }
  }
}


console.log(numbers[0]);


for (let i = 1; i < numbers.length; i++) {
    
    if (numbers[i] != numbers[i - 1]) {
        console.log(numbers[i]);
        
    }
    
}



