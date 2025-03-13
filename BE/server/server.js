// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql2");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const fs=require('fs')


// const app = express();
// app.use(cors());
// app.use(express.json());

// const db = mysql.createConnection({
//   host: 'authdbs.cxkmasyu8q0h.eu-north-1.rds.amazonaws.com', 
//   user: 'admin',
//   password: 'Dhinesh1801',
//   database: 'authdb',
//   port: 3306,
//   connectTimeout: 20000  

// });

// // const db = mysql.createConnection({
// //   host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
// //   user: '4TDCwQAy4pqaYLU.root',
// //   password: 'mUUxXHMoo4KgvdDx',
// //   database: 'test',
// //   port: 4000,
// //   ssl: {
// //     ca: fs.readFileSync('./certificate/isrgrootx1.pem'), 
   
// //   },
// //   connectTimeout: 10000,
// // });


// db.connect((err) => {
//   if (err) throw err;
//   console.log("MySQL Connected...");
// });

// const secretKey = "your_jwt_secret";

// // Nodemailer Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "dhineshp1801@gmail.com",
//     pass: "xahienmqqysdusce"
//   },
// });

// // User Registration
// app.post("/signup", async (req, res) => {
//   const { name, email, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);

//   db.query(
//     "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
//     [name, email, hashedPassword],
//     (err, result) => {
//       if (err) return res.status(500).json({ error: "Database Error" });
//       res.status(201).json({ message: "User Registered Successfully" });
//     }
//   );
// });

// // User Login
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
//     if (err || results.length === 0) return res.status(401).json({ error: "Invalid Credentials" });

//     const isMatch = await bcrypt.compare(password, results[0].password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid Credentials" });

//     const token = jwt.sign({ id: results[0].id, email: results[0].email }, secretKey, { expiresIn: "1h" });
//     res.json({ message: "Login Successful", token });
//   });
// });

// // Forgot Password - Send Reset Link
// app.post("/forgot-password", (req, res) => {
//   const { email } = req.body;
//   db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
//     if (err || results.length === 0) return res.status(404).json({ error: "User Not Found" });

//     const resetToken = jwt.sign({ email }, secretKey, { expiresIn: "10m" });

//    const resetLink = `https://authdbs.cxkmasyu8q0h.eu-north-1.rds.amazonaws.com/reset-password?token=${resetToken}`;

//     const mailOptions = {
//       from: "dhineshp1801@gmail.com",
//       to: email,
//       subject: "Password Reset", 
//       html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
//     };

//     transporter.sendMail(mailOptions, (error) => {
//       if (error) return res.status(500).json({ error: "Email not sent" });
//       res.json({ message: "Reset link sent to email" });
//     });
//   });
// });

// // Reset Password
// app.post("/reset-password", (req, res) => {
//   const { token, newPassword } = req.body;
  
//   try {
//     const decoded = jwt.verify(token, secretKey);
//     const hashedPassword = bcrypt.hashSync(newPassword, 10);

//     db.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, decoded.email], (err) => {
//       if (err) return res.status(500).json({ error: "Error resetting password" });
//       res.json({ message: "Password reset successful" });
//     });
//   } catch {
//     res.status(400).json({ error: "Invalid or expired token" });
//   }
// });
 
// // Start Server
// app.listen(5000, () => console.log("Server running on port 5000"));



// Demo:

// const express = require('express'); // Import express
// const app = express(); // Initialize express app
// const authrouter = require('./RouterDemo/auth'); // Import router from 'auth.js'

// // Mount the 'authrouter' to handle requests
// app.use(authrouter);

// // Make sure to listen on a port



const express=require ('express')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const mysql =require('mysql2')
const app=express();
const cors=require('cors')

//dbconnection

const db= mysql.createConnection(
  {
  host: 'authdbs.cxkmasyu8q0h.eu-north-1.rds.amazonaws.com', 
  user: 'admin',
  password: 'Dhinesh1801',
  database: 'authdb',
  port: 3306,
  connectTimeout: 20000  
  }
)

db.connect((err)=>{
  if(err) throw err;
  console.log("success")
})



//router:

const router=express.Router();
app.use(express.json());
app.use(cors());

//sign
app.post('/signup',async(req,res)=>{

  const {name,email,password}=req.body;
  const sql="insert into users (username,email,password) values(?,?,?)";
  const hashedPassword=await bcrypt.hash(password,10);
  db.query(sql,[name,email.hashedPassword],(err,result)=>{
    if(err) return res.status(400).json(err)
      res.json({message:"register successfully"})

  })

})


//login:

app.post("/login",(req,res)=>{
  const {email,password}=req.body;
  const sql="select * from users  where email =?"
  db.query(sql,[email],async(err,result)=>{
    if (err) return res.status(500).json(err);
    if (result.length===0) return res.status(404).json({message:"user not found"})
      const user =result[0]
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(404).json({message:"invalid "})
      const token=jwt.sign({id:user.id,email:user.email},"your_secret_key",{expiresIn:"1h"})
    res.json({token,user})
  })
})



app.listen(5000,()=>{
  console.log("server is running in port 5000")
})





