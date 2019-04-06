const { spawn,fork } = require('child_process');

const child = spawn('node',['poc/timeout.js']);
child.stdout.on('data', function (chunk) {
    console.log(chunk.toString().trim());
});
const compute = fork('poc/long_compute.js');
compute.send('start');
compute.on('message', sum => {
    console.log(`Sum is ${sum}`);
    compute.disconnect();
});