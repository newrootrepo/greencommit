// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');

// Import config file
const config = require('./config/config');

// Initialize express app
const app = express();


// Set up view engine (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Set up session (for login session management)
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: false
}));


// MongoDB connection without deprecated options
mongoose.connect(config.db.url)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));


// Home route
app.get('/', (req, res) => {
    res.render('login', { title: 'Welcome to the User Management System' });
});

// Start server
const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});