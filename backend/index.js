import dotenv from 'dotenv';
dotenv.config();

import express from "express"
import mysql from "mysql2"
import cors from "cors"
import multer from 'multer';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const app = express()
app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "He110#4023",
  database: "cozyfirm"
})

console.log('JWT Secret Key Loaded:', process.env.JWT_SECRET_KEY ? 'Yes (Value present)' : 'No (Value missing)');

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

app.get('/furnitureinfo/:furniture_id', (req, res) => {
  const reqFurnitureId = req.params.furniture_id;
  const q = 'SELECT * FROM cozyfirm.furniture WHERE furniture.furniture_id = ?';
  db.query(q, [reqFurnitureId], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    } else {
      return res.json(data);
    }
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

app.post("/register", async (req, res) => {
  const { username, password, first_name, last_name } = req.body;

  // --- 1. Basic Input Validation ---
  if (!username || !password || !first_name || !last_name) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }
  // Add more validation here if needed (e.g., username length, character restrictions)

  try {

    const [existingUsers] = await db.promise().query('SELECT * FROM cozyfirm.user WHERE username = ?', [username]);

    if (existingUsers.length > 0) {
      // If a user with this username already exists, send a 409 Conflict
      return res.status(409).json({ message: 'Username already exists. Please choose a different one.' });
    }

    // --- 3. Hash the Password Securely ---
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // --- 4. Insert New User into Database ---
    const insertQuery = 'INSERT INTO cozyfirm.user (`username`, `password`, `first_name`, `last_name`) VALUES (?, ?, ?, ?)';
    const [result] = await db.promise().query(insertQuery, [username, hashedPassword, first_name, last_name]);

    // --- 5. Send Success Response ---
    // 201 Created is the appropriate status code for successful resource creation.
    res.status(201).json({
      message: 'User registered successfully!',
      userId: result.insertId // Useful for frontend confirmation or immediate login
    });

  } catch (error) {
    // --- 6. Handle Server-Side Errors ---
    // Log the full error for debugging on the server
    console.error('Server error during user registration:', error);
    // Send a generic 500 Internal Server Error message to the client for security
    res.status(500).json({ message: 'An unexpected server error occurred during registration. Please try again later.' });
  }
})

app.post("/login", async (req, res) => { // Make this an 'async' function
  const { username, password } = req.body;

  // --- 1. Basic Input Validation ---
  if (!username || !password) {
    // If username or password is missing, send a 400 Bad Request
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    // --- 2. Retrieve User from Database by Username ---
    const q = 'SELECT * FROM cozyfirm.user WHERE username = ?';
    // Use db.promise().query for async/await, returning an array with [rows, fields]
    const [users] = await db.promise().query(q, [username]);

    // If no user found with that username
    if (users.length === 0) {
      // Send a generic "Invalid credentials" message for security (don't reveal if username or password was wrong)
      return res.status(401).json({ message: 'Invalid username or password.' }); // 401 Unauthorized
    }

    const user = users[0]; // Get the first (and only) user record found

    // --- 3. Secure Password Comparison ---
    // Compare the plain-text password from the request (password)
    // with the hashed password from the database (user.password)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Passwords do not match
      return res.status(401).json({ message: 'Invalid username or password.' }); // 401 Unauthorized
    }

    // --- 4. Passwords match: Generate JWT ---
    // Ensure process.env.JWT_SECRET_KEY is defined in your .env file
    // The payload should contain non-sensitive user info (like ID and username)
    const token = jwt.sign(
      { userId: user.user_id, username: user.username }, // Payload matches your user table's user_id
      process.env.JWT_SECRET_KEY,                       // Your secret key from .env
      { expiresIn: '1h' }                               // Token expires in 1 hour
    );

    // --- 5. Send Success Response with Token and User Info ---
    res.status(200).json({ // 200 OK for successful login
      message: 'Logged in successfully!',
      token,           // Send the generated JWT to the client
      userId: user.user_id,
      username: user.username
    });

  } catch (error) {
    // --- 6. Handle Server-Side Errors ---
    console.error('Server error during user login:', error);
    res.status(500).json({ message: 'An unexpected server error occurred during login. Please try again later.' });
  }
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