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

app.get("/browse", (req, res) => {
    console.log("This is the browse page.");
})

app.get("/bloglist", (req, res) => {
    const q = "SELECT b.*, u.username FROM cozyfirm.blog b JOIN cozyfirm.user u ON b.user_id = u.user_id";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.get(`/blogpost/:blog_id`, (req, res) => {
    const req_blog_id = req.params.blog_id;
    const q = `SELECT b.*, u.username FROM cozyfirm.blog b JOIN cozyfirm.user u ON b.user_id = u.user_id WHERE b.blog_id = ${req_blog_id}`;
    db.query(q, [req_blog_id], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})

app.post("/createblog", (req, res) => {
    const { blog_title, blog_date, blog_description, blog_tag, blog_image_path, user_id } = req.body;
    const q = "INSERT INTO cozyfirm.blog (blog_title, blog_date, blog_description, blog_tag, blog_image_path, user_id) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(q, [blog_title, blog_date, blog_description, blog_tag, blog_image_path, user_id], (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json({ message: "Blog post created successfully" })
        }
    })
})

app.post("/login", (req, res) => {
    const q = "SELECT * FROM cozyfirm.user WHERE username = ? AND password = ?";
    db.query(q, [req.body.username, req.body.password], (err, data) => {
        if (err) { return res.json(err) }
        if (data.length > 0) {
            return res.json("success")
        }
        else {
            return res.json("invalid")
        }
    })
})

app.get("/account", (req, res) => {
    const q = "SELECT * FROM cozyfirm.user;"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })

})