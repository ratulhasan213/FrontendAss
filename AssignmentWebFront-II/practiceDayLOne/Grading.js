/* 

0-39 : C
40-59:b
60-79:A-
70-79:A

80-100:A+

*/



var res = 87;

if (res < 0) {
    console.log("F");
    
}
else if (res >= 0 && res < 40) {
    console.log("C");
    
}

else if (res >= 40 && res < 60) {
    console.log("B");
    
}
else if (res >= 60 && res < 70) {
    console.log("A-");
    
}
    
else if (res >= 70 && res < 80) {
    console.log("A");
    
}
else {
    console.log("A+");
    
}