const fs = require('fs');
console.log(1);
setTimeout(()=>{
    console.log(2);
    console.log(new Date().getTime())
},10);
let i =1;
console.log(new Date().getTime())
while(i<100000000)
    (i++)
console.log("END")