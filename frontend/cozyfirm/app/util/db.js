import mysql from "mysql2";

const pool  = mysql.createPool({
    connectionLimit : 1000,
    host            : "localhost",
    user            : "root",
    password        : "Nakirigumi519!",
    database: "cozyfirm",
});

export default pool;