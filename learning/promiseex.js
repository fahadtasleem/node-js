

const runAfter = function(i){
    return new Promise(function(resolve,reject){
        console.log('Initializing....');
        setTimeout(()=>{
            if(i==3){
                reject('Err '+i);
                return;
            }
            resolve('Run '+i);
            console.log('Resolving...');
        },300);
    });
}

// let p = runAfter(0);
// console.log('ABC')
// p.then(function(d){
//     console.log('rold ..'+d);
// }).catch((e)=>{
//     console.log('Errpr '+e);
// });

let ps = [runAfter(1),runAfter(3)]
Promise.all(ps).then((d)=>{
    console.log(d);
}).catch((e)=>{
    console.log(e);
});