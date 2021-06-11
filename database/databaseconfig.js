const mysql  = require('mysql');
const config = require('../config.json');

const dbconn = mysql.createConnection({
    host        : config.mysql_host,
    user        : config.mysql_user,
    password    : config.mysql_password,
    database    : config.mysql_database,
    port        : config.mysql_port
});

dbconn.connect(function(err){
    if(err){
        console.log('Database connection : '+err);
        throw err;
    }else{
        console.log('Database connected');
    }
});

module.exports = dbconn;