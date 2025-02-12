// Secure Login and Dashboard System using Node.js with Express

// Required Modules
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt'); // Using bcrypt with salt round of 12 for strong password hashing
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secureSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000, httpOnly: true, secure: false } // Set secure: true in production (HTTPS)
}));
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database (Using JSON as a simple data store)
const usersFile = path.join(__dirname, 'users.json');
let users = [];

// Load Users from JSON
if (fs.existsSync(usersFile)) {
  users = JSON.parse(fs.readFileSync(usersFile));
}

// Authentication Middleware
function checkAuth(req, res, next) {
  if (req.session.user) return next();
  res.redirect('/login');
}

// Role-based Access Control Middleware
function checkRole(role) {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) return next();
    res.status(403).send('Access Denied');
  };
}

// Home Route - Redirects to Register Page
app.get('/', (req, res) => {
  res.redirect('/register');
});

// Registration Route
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.send('Username already taken!');
  }
  const hashedPassword = bcrypt.hashSync(password, 12);
  const newUser = { username, password: hashedPassword, role: 'user' };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  res.redirect('/login');
});

// Login Route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    req.session.regenerate((err) => {
      if (err) return res.redirect('/login');
      req.session.user = { username: user.username, role: user.role };
      res.redirect('/dashboard');
    });
  } else {
    res.redirect('/login');
  }
});

// Dashboard Route
app.get('/dashboard', checkAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Admin Route (Role-Based Access Control Example)
app.get('/admin', checkAuth, checkRole('admin'), (req, res) => {
  res.send('<h1>Admin Dashboard</h1>');
});

// Logout Route
app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
