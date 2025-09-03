var friends = ["rahim", "karim", "abdul", "sadsd", "heroAlom"];

let ans = "";
for (let i = 0; i < friends.length; i++) {
    
    if (ans.length < friends[i].length) {
      ans = friends[i];
    }
    
}

console.log(ans);
