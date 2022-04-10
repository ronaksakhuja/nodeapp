const mysql = require('mysql')

const connectDBM = () => {
    const conn =  mysql.createConnection({
        user:"root",
        password:"root",
        host:"localhost",
        port:"8889",
        database:"nodejs"
    })
    return conn;
}

module.exports = connectDBM