const express = require("express");
const path = require("path");
const mongoose=require('mongoose')


const app = express();
const PORT = 8000;

mongoose // This line connects your application to a MongoDB database using Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js.
    .connect('mongodb://127.0.0.1:27017/blogify')
    .then((e)=>console.log("MOngoDb Connected"))

const userRoute = require('./routes/user');

//This middleware parses incoming requests with URL-encoded payloads (like form submissions). The extended: false option means it will use the classic querystring library, which does not support rich objects and arrays.
app.use(express.urlencoded({ extended: false }));
//This middleware parses incoming requests with JSON payloads. It's essential for APIs that receive data in JSON format (like from a frontend app).

 
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
    res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));




// 1. The routes Folder
// This folder contains all your route files. For example, you might have:

// routes/user.js (handles user-related endpoints)
// routes/post.js (handles post-related endpoints), etc.
// 2. The index.js or app.js File
// This is the main entry point of your application. Here, you set up Express and import (require) the different route files.

// 3. The Line: app.use("/user", UserRoute);
// UserRoute is imported from your routes/user.js file.
// The line app.use("/user", UserRoute); tells Express:
// For any route that starts with /user, use the routes defined in user.js.
// Example: If you defined router.get("/profile") in user.js, then the full URL will be /user/profile.