import express from "express"
import mysql from "mysql2"
import cors from "cors"
import multer from 'multer';
import fs from 'fs';
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
    const { furniture_name } = req.query;
    let q = "SELECT * FROM cozyfirm.furniture";

    if (furniture_name) {
        q += " WHERE furniture_name LIKE ?";
    }

    db.query(q, [`%${furniture_name}%`], (err, data) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.json(data);
    });
});

app.get("/bloglist", (req, res) => {
    const { blog_title } = req.query;
    let q = "SELECT b.*, u.username FROM cozyfirm.blog b JOIN cozyfirm.user u ON b.user_id = u.user_id";
    let params = [];
  
    if (blog_title) {
      q += " WHERE blog_title LIKE ?";
      params.push(`%${blog_title}%`);
    }
  
    q += " ORDER BY b.blog_id ASC";
  
    db.query(q, params, (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json(data);
    });
  });
  
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


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../frontend/cozyfirm/public/furniture_images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const fields = [
    { name: 'blog_image_file', maxCount: 1 },
];

app.post('/createblog', upload.fields(fields), (req, res) => {
  
  const { blog_title, blog_date, blog_description, blog_tag, user_id } = req.body;
  const filePath = req.files.blog_image_file[0].path.replace(/\\/g, '/');
  const imagePath = filePath.replace(
    "../frontend/cozyfirm/public",
    ""
  );
  const parsedUserId = parseInt(user_id, 10);

  const q = "INSERT INTO cozyfirm.blog (blog_title, blog_date, blog_description, blog_tag, blog_image_path, user_id) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [blog_title, blog_date, blog_description, blog_tag, imagePath, parsedUserId];
  
  db.query(q, values, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send(`Error creating blog post: ${err.message}`);
    } else {
      res.send(`Blog post created successfully!`);
    }
  });
});

app.put('/editblog/:blog_id', upload.fields(fields), (req, res) => {
    const { edit_blog_title, edit_blog_date, edit_blog_description, edit_blog_tag, edit_user_id } = req.body;
    const blogId = req.params.blog_id;
    const parsedUserId = parseInt(edit_user_id, 10);
    const filePath = req.files.blog_image_file[0].path.replace(/\\/g, '/');
    const imagePath = filePath.replace("../frontend/cozyfirm/public", "");
 
    const q = "SELECT `blog_image_path` FROM `cozyfirm`.`blog` WHERE `blog_id` = ?";
    db.query(q, [blogId], (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send(`Error retrieving old image path: ${err.message}`);
      } else {
     
        const oldImagePath = results[0].blog_image_path;

        const oldImageFullPath = `../frontend/cozyfirm/public${oldImagePath}`;

        fs.unlinkSync(oldImageFullPath, (err) => {
          if (err) {
            console.error(err);
          }
        });

        const updateQ = "UPDATE `cozyfirm`.`blog` SET `blog_title` = ?, `blog_date` = ?, `blog_description` = ?, `blog_tag` = ?, `blog_image_path` = ?, `user_id` = ? WHERE `blog_id` = ?";
        const values = [edit_blog_title, edit_blog_date, edit_blog_description, edit_blog_tag, imagePath, parsedUserId, blogId];
        db.query(updateQ, values, (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).send(`Error updating blog post: ${err.message}`);
          } else {
            res.send(`Blog post updated successfully!`);
          }
        });
      }
    });
  });
  

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

app.get("/contact", (req, res) => {
    const q = "SELECT cozyfirm.user.user_id,cozyfirm.user.first_name, cozyfirm.user.last_name FROM cozyfirm.user, cozyfirm.user_admin where user.user_id = user_admin.user_id and user_admin.admin_level = 1"
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data)
        }
    })
})