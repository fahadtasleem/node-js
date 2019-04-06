var https = require('https');
var async = require('async');
var fs = require('fs');
let error = 0;
var conn = function(rId,hname,i,succ){
    var option = {
        protocol: "https:",
        host: "192.168.182.3",
        port: 443,
        path:"/resource/heartbeat",
        method: 'POST',
        rejectUnauthorized:false,
        headers :{'Content-Type': 'application/json'}
    }
    var data = {
        "version": 6,
        "caller": {
          "name": "ct-lgm",
          "version": "4.1.5++Ubuntu-BLR.20170905T144716-0"
        },
        "usecElapsed": {
          "lastCall": 15097000,
          "lastReturn": 15014701
        },
      "resourceId": rId,
        "sequenceNumber": 32,
        "czsrcport":
          {
            "2a598114c84":1,
            "27e0400ddb8":2
          },
        "resourceinfo":{  
            "hostname":hname,
            "cpuinfo":{  
               "frequencyMHz":2701,
               "model":"Intel(R) Core(TM) i7-4600U CPU @ 2.10GHz",
               "nCores":2,
               "systemModel":"VMware Virtual Platform",
              "architecture":"x86_64"
            },
            "interfaces":[  
               {  
                  "interface":"Loopback",
                  "v4_addr":"127.0.0.1",
                  "v6Addr":"",
                  "netmask": "255.0.0.0"
               },
               {  
                  "interface":"Ethernet0",
                  "v4_addr":"192.168.20."+hname.substring(1),
                  "v6Addr":"",
                  "netmask": "255.255.255.255"
               }
            ],    
            "mtokendir":"/var/opt/colortokens/lgm/1.mtoken.d",
          "osinfo" : { "arch" : "64-bit", "full_name" : "Microsoft Windows 10 Pro", "major_version" : "10", "minor_version" : "0", "name" : "Microsoft Windows 10", "os_class" : "Windows", "os_type" : "Workstation", "platform_specific" : { "build_number" : "15063", "name" : "Microsoft Windows 10 Pro", "organization" : "", "service_pack_major_version" : "0", "service_pack_minor_version" : "0" }, "version" : "10.0.15063",
                      "version_supports_sra": "Supported"}
          
         },
        "messages":[
          {"success":true}
        ]
      }
    console.log('Sending req '+hname);
    var req = https.request(option,(res)=>{
        res.setEncoding('utf8');
        res.on('data',(body)=>{
            try{
                console.log(body+' ' +hname);
                if(res.statusCode !== 200){
                    error++;
                    console.log('Error occurrend for '+i,error);
                }
                succ && succ();
            }catch(e){
                console.log(e);
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

let rJson = JSON.parse(fs.readFileSync('./resource.json','utf-8'));
let ts = [1537788899450,1537788899455];
console.log(rJson.length)

for(let i=0;i<rJson.length;i++){
    setTimeout(()=>{
        console.log( rJson[i]._id+ " "+rJson[i].hostname+' '+i+" "+new Date().toLocaleString());
        conn( rJson[i]._id, rJson[i].hostname,i);
    },i*100)
}