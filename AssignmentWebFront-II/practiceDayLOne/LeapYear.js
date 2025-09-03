let year = 2028;

let ans;

if (year % 400 == 0) {
    ans = "YES";
}
else if (year % 100 == 0) {
    ans = "NO";
}
else if (year % 4 == 0) {
    ans = "YES";
}
else {
    ans = "NO";
}


console.log(ans);

