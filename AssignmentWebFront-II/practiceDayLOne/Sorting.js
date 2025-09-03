let arr = [6, 7, 2, 1, 9, 3, 5, 10, 4, 8];


for (let i = 0; i < arr.length; i++){
    for (let j = 0; j < arr.length; j++){
        
        if (arr[i] < arr[j]) {
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

    }
}


console.log(...arr);
