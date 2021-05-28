var express = require("express");
var bcrypt = require("bcryptjs");
var router = express.Router();
var jwt = require("jsonwebtoken");
var keys = require("../config/keys");

// validation input
const validateRegisterInput = require("../check/register");
const validateLoginInput = require("../check/login");
const validateRecRegisterInput = require("../check/register_r");
// Load User model
const User = require("../models/Users");
const Recruit = require("../models/recruit");
const Applicant = require("../models/applicant");

// GET request 
// Getting all the users
router.get("/", function (req, res) {
    Applicant.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register/recruit", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRecRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Recruit.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            Applicant.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    return res.status(400).json({ email: "Email already exists" });
                } else {
                    const newUser = new Recruit({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        contact: req.body.contact,
                        bio: req.body.bio

                    });
                    //HASHING PASSWORD
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    res.status(200).json(user);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        });
                    });
                }
            });
        }
    });
});

// POST request 
// Add a user to db
router.post("/register/applicant", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Recruit.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            Applicant.findOne({ email: req.body.email }).then(async user => {
                if (user) {
                    return res.status(400).json({ email: "Email already exists" });
                } else {
                    const newUser = await new Applicant({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        skills: req.body.skills
                    });
                    //HASHING PASSWORD
                    console.log(newUser);
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) { console.log(err); }
                            else {

                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        res.status(200).json(user);
                                    })
                                    .catch(err => {
                                        res.status(400).send(err);
                                    });
                            }
                        });
                    });
                }
            });
        }
    });
});

router.post("/app", (req, res) => {
    Applicant.findOne({
        "email": req.body.appmail
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await res.json(user);
        console.log(user);
    });
});
router.post("/rec", async function(req, res){
    var email = req.body.recmail 
    console.log(email)
    console.log("ho");
    const ans = await Recruit.findOne({
        "email": email
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await console.log(user);
        await res.json(user);
        
    });
});
router.post("/appupdate", async function (req, res) {
    var email = req.body.appmail;
    var name = req.body.name;
    var skills = req.body.skills;
    const ans = await Applicant.findOneAndUpdate({
        "email": email,
    }, {
        "name": name,
        "skills":skills
    }, {
        new: true
    }
    );
    await res.json(ans);
    await console.log(ans);
    console.log("ho")

    res.json({ message: "Edit successful" });
});
router.post("/recupdate", async function (req, res) {
    var email = req.body.email;
    var name = req.body.name;
    var bio = req.body.bio;
    var contact = req.body.contact;
    const ans = await Recruit.findOneAndUpdate({
        "email": email,
    }, {
        "name": name,
        "contact":contact,
        "bio":bio
    }, {
        new: true
    }
    );
    await res.json(ans);
    await console.log(ans);
    console.log("ho")

    res.json({ message: "Edit successful" });
});

// POST request 
// Login
router.post("/login", (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    // Find user by email
    const email = req.body.email;
    const password = req.body.password;
    Recruit.findOne({ email }).then(user => {
        // Check if user email exists
        if (user) {
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        usertype: user.usertype,
                        contact: user.contact,
                        bio: user.bio
                    };
                    jwt.sign(
                        payload,
                        keys.secretOrKey,
                        {
                            expiresIn: 31556926 // 1 year in seconds
                        },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                user: user
                            });
                        }
                    );
                    //return res.json(user);
                }
                else {
                    return res.status(400).json({
                        error: "Password Incorrect",
                        passwordincorrect: "Password incorrect"
                    });
                }
            });
        }
        else {
            Applicant.findOne({ email }).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({
                        error: "Email not found",
                        emailnotfound: "Email not found"
                    });
                }
                // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                    if (isMatch) {
                        // User matched
                        // Create JWT Payload
                        const payload = {
                            id: user.id,
                            name: user.name,
                            usertype: user.usertype,
                            num: user.num,
                            rating: user.rating
                        };
                        // Sign token
                        console.log(payload);
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 31556926 // 1 year in seconds
                            },
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: "Bearer " + token,
                                    user: user
                                });
                            }
                        );
                        //return res.json(user);
                    } else {
                        return res.status(400).json({
                            error: "Password Incorrect",
                            passwordincorrect: "Password incorrect"
                        });
                    }
                });
            });
        }
    });
});

module.exports = router;