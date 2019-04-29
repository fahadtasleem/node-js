var p = new Promise((resolve,reject)=>{
    resolve();
});

setTimeout(()=>{
    console.log("timeout")
},0);

p.then(()=>{
    console.log("resolved");
});

setImmediate(()=>{
    console.log("immediate");
});

process.nextTick(()=>{
    console.log("tick");
});