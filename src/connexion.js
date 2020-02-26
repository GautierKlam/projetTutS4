var mysql = require('mysql');


const Connexion = mysql.createConnection({
   host:'devbdd.iutmetz.univ-lorraine.fr',
  port:3306,
  user:'sizaire1u_appli',
  data:'sizaire1u_projets4',
  password:'31806635'
});

conn.connect(function(err) {
  if (err) throw err;
});
