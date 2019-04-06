var maxmind = require('maxmind');

// maxmind.open('./GeoLite2-City.mmdb', (err, cityLookup) => {
//     var city = cityLookup.get('106.51.74.197');
//     console.log(city)
//   });

  function test(){
      try{
        var cityLookup = maxmind.openSync('./GeoLite2-City.mmdb');
      }catch(E){
          console.info("NO FILE....")
      }
    var city = cityLookup.get('106.51.74.197');
    console.log(JSON.stringify(city))
  }

test();
console.log('Exit........')
setTimeout(function(){

},5000)