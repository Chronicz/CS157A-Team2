import express from "express"
import mysql from "mysql2"
import cors from "cors"
const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "He110#4023",
    database: "cozyfirm"
})

app.listen(8000, () => {
    console.log("Connected to backend... PORT 8000")
})

app.get("/", (req, res) => {
    const q = "SELECT * FROM cozyfirm.user;"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.get("/bloglist", (req, res) => {
    const q = "SELECT * FROM cozyfirm.blog";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.get(`/api/blogpost/${blog_id}`, (req, res) => {
    const q = "SELECT * FROM cozyfirm.blog WHERE blog.blog_id = blog_id";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})
