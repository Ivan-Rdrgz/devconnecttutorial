const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const auth = require("./routes/api/auth.js");
const posts = require("./routes/api/posts.js");
const profiles = require("./routes/api/profiles.js");
const passport = require("passport");
const port = process.env.PORT || 5000;
const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("connected to MongoDB!"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport configuration (jwt strategy)
require("./config/passport")(passport);

//Use routes
app.use("/api/auth", auth);
app.use("/api/posts", posts);
app.use("/api/profiles", profiles);

app.listen(port, () => console.log(`Listening on port ${port} ...`));
