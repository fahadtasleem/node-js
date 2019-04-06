var https = require('https');
var ip = require('ip');

let error = 0;
var conn = function(id,tIps,succ){
    var option = {
        protocol: "https:",
        host: "192.168.182.3",
        port: 443,
        path:"/resource/bridge/connection/sync",
        method: 'POST',
        rejectUnauthorized:false,
        headers :{'Content-Type': 'application/json'}
    }
    var data ={
            "tunnelIps": tIps,
            "ctBridgeId": id
         }
    console.log('Sending req ');
    var req = https.request(option,(res)=>{
        res.setEncoding('utf8');
        res.on('data',(body)=>{
            try{
                console.log(body);
                succ && succ();
            }catch(e){
                console.log(e);
            }
            console.log(new Date().toString())
        });
    });
    req.on("error",(e)=>{
        error++;
        console.log('eror '+e.toString());
        console.log('ERRORED REQ '+error);
    });
    req.write(JSON.stringify(data));
    req.end();
}

let tunnelIp = [];
for(let i=0;i<300;i++){
    let ipA = '10.2.3.'+i;
    tunnelIp.push(ip.toLong(ipA));
}
console.log("Syncing "+tunnelIp.length+' '+new Date().toLocaleString());
conn("kd73NK5uBf3wsC4xB",tunnelIp);
// {
//     "tunnelIps": [167904005],
//     "ctBridgeId": "kd73NK5uBf3wsC4xB"
//  }
