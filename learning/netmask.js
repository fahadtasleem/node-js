var ip = require('ip');

console.log(ip.cidrSubnet('192.168.1.134/26'));
console.log(ip.toLong('172.31.100.4'));
console.log(ip.fromLong(2887738372));
console.log(ip.fromLong(2887738369));
console.log(ip.isPrivate("172.32.0.1"));
