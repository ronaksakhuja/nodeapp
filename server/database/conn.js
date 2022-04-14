const mysql = require('mysql');

const connectDBM = () => {
    const conn =  mysql.createConnection({
        host:                   '127.0.0.1',
        user:                   'root',
        password:               '',
        port:                   "3306",
        database:               "nodejs"
    })
    conn.connect((err) => {
        if(err){
        console.log('error', err);
        return;
    }
    })
    return conn;
}
module.exports = connectDBM