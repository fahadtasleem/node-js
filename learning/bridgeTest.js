var https = require('https');
var async = require('async');
let error = 0;
let upperL = 300;
var conn = function(time,type,i,succ){
    var option = {
        protocol: "https:",
        host: "192.168.182.3",
        port: 443,
        path:"/resource/bridge/connection",
        method: 'POST',
        rejectUnauthorized:false,
        headers :{'Content-Type': 'application/json'}
    }
    var data = {
        "ctBridgeId":"kd73NK5uBf3wsC4xB",
        "tunnelIp": "10.2.3."+i,
        "resourceIp": "106.51.74."+i,
        "type": type,
        "connectedAt": time,
        "peerId": "ST=KArnata,CN=u"+i+"@cortokens1.com"
    }
    console.log('Sending req '+type);
    var req = https.request(option,(res)=>{
        res.setEncoding('utf8');
        res.on('data',(body)=>{
            try{
                console.log(body);
                if(res.statusCode !== 200){
                    error++;
                    console.log('Error occurrend for '+i,error);
                    conn(time,type,i,succ);
                }
                succ && succ();
            }catch(e){
                console.log(e);
            }
            if(i == 300-1){
                console.log('************************************** END '+new Date().toString());
            }
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

console.log('**************************************'+new Date().toString())
let ts = [1537788899450,1537788899455];
var q = async.queue(function(task, callback) {
    console.log(task.d +" "+new Date().toLocaleString());
    conn(task.d,task.type,()=>{
        callback();
    });
}, 1);
for(let i=1;i<upperL;i++){
    let type = i%2==0?'up-client':"down-client";
    type = 'down-client';
    let d = i%2;

    setTimeout(()=>{
        console.log(d + " "+i+" "+new Date().toLocaleString());
        conn(ts[d],type,i);
    },i*2)
}

setTimeout(()=>{console.log('OUT')},6000);