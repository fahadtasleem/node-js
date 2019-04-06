var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://localhost:27017/colormaster?readConcern=majority")
    .then(function(client){
        let db = client.db('colormaster')

        let change_streams = db.collection('resources').watch()
        change_streams.on('change', function(change){
            console.log(JSON.stringify(change));
        });
});