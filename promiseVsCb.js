let t = function(cb){
    setTimeout(()=>{
        throw new Error("erer");
        cb();
    },0);
}

const runAfter = function(i){
    return new Promise(function(resolve,reject){
        console.log('Initializing....');
        setTimeout(()=>{
            throw new Error("Promise error");
            resolve(3);
        },0);
    });
}

var p = runAfter(1);
p.then(()=>{
    console.log("resolved");
}).catch((e)=>{
    console.log("--------------");
    console.log(e);
});

t(()=>{
    console.log("CB");
});