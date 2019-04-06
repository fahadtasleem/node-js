var fs = require('fs');
var http = require('http');

const options = {
  host: 'www.stackoverflow.com',
  port: 80,
  path: '/index.html'
};

function ca (){
    console.log('Start');
    setTimeout(() => console.log('TO1'), 0);
    setImmediate(() => console.log('IM1'));
    process.nextTick(() => console.log('NT1'));
    setImmediate(() => console.log('IM2'));
    setTimeout(() => console.log('TO1'), 0);
    process.nextTick(() => console.log('NT2'));
    http.get(options, () => console.log('IO1'));
    fs.readdir(process.cwd(), () => console.log('IO2'));
    setImmediate(() => console.log('IM3'));
    process.nextTick(() => console.log('NT3'));
    setImmediate(() => console.log('IM4'));
    fs.readdir(process.cwd(), () => console.log('IO3'));
    console.log('Done');
};
ca();