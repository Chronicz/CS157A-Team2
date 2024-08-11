import mysql from "mysql2";

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nakirigumi519!",
    database: "cozyfirm"
})

export default db;