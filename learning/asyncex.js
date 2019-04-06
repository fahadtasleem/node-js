var request = require('request');

const timeout = function (delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(4)
      }, delay)
    })
  }
  
  async function timer () {
    console.log('timer started')
    try{
        let a = await (timeout(100));
        console.log(a)
    }catch(e){
        console.log(e);
    }
    console.log('timer finished')
  }

  async function req(){
    console.log('requesting...');
    let response = await request.get('http://google.com');
    console.log('after response');
    if (response.err) { console.log('error');}
    else { console.log('fetched response')};
    console.log(response);
  }
  
  timer();

  //req();
  //console.log('After req...');