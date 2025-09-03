

const monthlySavings = (arr, living) => {
  let arrtype = typeof arr;
  let saltype = typeof living;

  if (arrtype != "object" && saltype != "number") {
    return "invalid input";
  }

  let money = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] >= 3000) {
      arr[i] -= arr[i] * 0.2;
    }
    money += arr[i];
  }

  if (money < living) {
    return "earn more";
  }

  return money - living;
};



let arr = [900, 2700, 3400];
let num = 100;

console.log(monthlySavings(num, arr));
