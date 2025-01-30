const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'authdbs.cxkmasyu8q0h.eu-north-1.rds.amazonaws.com', 
  user: 'admin',
  password: 'Dhinesh1801',
  database: 'authdb',
  port: 3306,
  connectTimeout: 20000  
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

const secretKey = "your_jwt_secret";

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "dhineshp1801@gmail.com",
    pass: "xahienmqqysdusce"
  },
});

// User Registration
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Database Error" });
      res.status(201).json({ message: "User Registered Successfully" });
    }
  );
});

// User Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: "Invalid Credentials" });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return res.status(401).json({ error: "Invalid Credentials" });

    const token = jwt.sign({ id: results[0].id, email: results[0].email }, secretKey, { expiresIn: "1h" });
    res.json({ message: "Login Successful", token });
  });
});

// Forgot Password - Send Reset Link
app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: "User Not Found" });

    const resetToken = jwt.sign({ email }, secretKey, { expiresIn: "10m" });

   const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: "dhineshp1801@gmail.com",
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: "Email not sent" });
      res.json({ message: "Reset link sent to email" });
    });
  });
});

// Reset Password
app.post("/reset-password", (req, res) => {
  const { token, newPassword } = req.body;
  
  try {
    const decoded = jwt.verify(token, secretKey);
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    db.query("UPDATE users SET password = ? WHERE email = ?", [hashedPassword, decoded.email], (err) => {
      if (err) return res.status(500).json({ error: "Error resetting password" });
      res.json({ message: "Password reset successful" });
    });
  } catch {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});
 
// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
