const { Router } = require("express");
const User = require("../models/user.js");
const router = Router();

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup",async(req,res)=>{
    // Extract fullName, password, and email from the request body (form data sent by the user)
    const{fullName,password,email}=req.body;
    // Create a new user in the database with the provided information
    await User.create({
        fullName,
        email,
        password
    });
    return res.redirect("/");
})

module.exports = router;
