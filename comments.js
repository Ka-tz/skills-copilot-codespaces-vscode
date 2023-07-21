// Create web server 

// Import express
const express = require("express");
// Import body-parser
const bodyParser = require("body-parser");
// Import mongoose
const mongoose = require("mongoose");
// Import database
const db = require("./config/keys").mongoURI;
// Import passport
const passport = require("passport");
// Import user route
const users = require("./routes/api/users");
// Import posts route
const posts = require("./routes/api/posts");
// Import profile route
const profile = require("./routes/api/profile");

// Create express app
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

// Set port
const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));
