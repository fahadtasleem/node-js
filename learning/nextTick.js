console.log(1);
process.nextTick(()=>{
    console.log("tick");
});
setImmediate(()=>{
    console.log("Immedeate");
});
console.log(3);