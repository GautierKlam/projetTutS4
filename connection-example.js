var mysql = require('mysql');

console.log('Get connection ...');

var conn = mysql.createConnection({
   host:'devbdd.iutmetz.univ-lorraine.fr',
  port:3306,
  user:'sizaire1u_appli',
  data:'sizaire1u_projets4',
  password:'31806635'
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql1= "Select lat,long from site "

conn.query(sql1,function(err,fields){
    if (err) throw err ;
        write(long)
        write(lat) ;

}) ;

});