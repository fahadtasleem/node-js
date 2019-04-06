const { exec,fork,spawn } = require('child_process');

exec('whoami /upn', (e, so, se)=>{
	console.log('error'+ e);
	console.log('so '+ so);
	//console.log('se '+se);
});
console.log(process.pid+' Main');
let getChileP = function(isFork){
	const ls = isFork?fork('ls', ['-lh', '/usr']):spawn('ls', ['-lh', '/usr']);
	console.log(ls.pid+ ' '+isFork);

	ls.stdout.on('data', (data) => {
	console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
	console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
	console.log(`child process exited with code ${code}`);
	});
}
getChileP(false);
//getChileP(true);

setTimeout(function(){console.log('end')},4000)