import express from "express"
import mysql from "mysql2"

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "jin",
    password: "jin2000",
    database: "cozyfirm"
})

app.listen(8080, () => {
    console.log("Connected to backend...")
})

app.get("/", (req, res) => {
    const q = "SELECT * FROM cozyfirm.users;"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})
