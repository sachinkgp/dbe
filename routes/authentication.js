const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")

router.post('/login', (req, res) => {
    console.log("in lgin page")
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ message: "please provide all values" })
    }
    
    User.findOne({email:email})
        .then((savedUser) => {
            if (!savedUser) {
                return res.json({ message: "user does not exist with given email id" })
            }
            else if (savedUser.password != password) {
                return res.json({ message: "wrong password" })
            } else {
                console.log(savedUser)
                return res.json({savedUser})
            }
        })
        return
})

router.post('/signup', (req, res) => {
    console.log("here 2")
    const { email, password, name, mobile_number} = req.body;
    if (!email || !password || !name || !mobile_number) {
        return res.json({message: "Please provide all the fields"})
    }
    else {
        User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.json({ message: "User already exist"});
            }
        })
    }
    console.log(name)
    const user = new User({
        name,
        email,
        password,
        mobile_number
    })
    user.save()
        .then(user => {
            return res.json({ message: "User registered Successfully" })
        })
})


module.exports = router;