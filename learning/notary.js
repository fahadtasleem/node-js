var https = require('https');
var async = require('async');
var fs = require('fs');
let error = 0;
var conn = function(rId,hname,i,succ){
    var option = {
        protocol: "https:",
        host: "192.168.182.3",
        port: 443,
        path:"/notary/insertToken",
        method: 'POST',
        rejectUnauthorized:false,
        headers :{'Content-Type': 'application/json','x-client-serial-number': 'AB'}
    }
    var data = {
        "cn": rId,
        "tenantName": "CTdemo",
        "version":6,
        "caller":{
          "name":"ct-lgm_t",
            "version":"3.15.1++B-W10EL-5B36B82.20170709T225518-0"
        },
        "resourceinfo":{
          "hostname": hname,
            "cpuinfo":{  
               "frequencyMHz":2701,
               "model":"Intel(R) Core(TM) i7-4600U CPU @ 2.10GHz",
               "nCores":2,
               "systemModel":"VMware Virtual Platform",
              "architecture":"x86_64"
            },
            "interfaces":[  
               {  
                  "interface":"Ethernet0",
                  "v4_addr":"192.168.20."+i,
                  "v6Addr":"",
                  "netmask": "255.255.255.255"
               }
            ]
        },
         "osInfo":{
            "name":"Ubuntu",
            "edition":"Desktop Professional",
            "version":"10.0.15063"
          },
        "endpointType":"USER"
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

for(let i=0;i<10;i++){
    setTimeout(()=>{
        //console.log( rJson[i]._id+ " "+rJson[i].hostname+' '+i+" "+new Date().toLocaleString());
        conn( 'u'+i, 'u'+i,i);
    },i*100)
}