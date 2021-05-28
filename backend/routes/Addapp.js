var express = require("express");
var router = express.Router();

const ls = require("local-storage");

//validation input
const validateAppInput = require("../check/application");
//Load user model
const Application = require("../models/application");
const Applicant = require("../models/applicant");
const Job = require("../models/Job")

router.get("/", function (req, res) {
    Application.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});
router.post("/delete", async function (req, res) {
    var email = req.body.mail;
    const ans = await Application.findOneAndDelete({
        "appmail": email
    });
    res.json(ans);
});
router.post("/apply", async function (req, res) {
    const { errors, isValid } = validateAppInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    Applicant.findOne({ email: req.body.appmail })
        .then(async user => {
            if (user.open_app >= 10) {
                return res.status(400).json({ email: "Cannot have more than 10 open applicaions" });
            }
            else if (user.iswork == "true") {
                return res.status(400).json({ user: "You already have a job" });
            }
            else {

                var open_app = await user.open_app + 1;
                console.log(open_app);
                const ans = await Applicant.findOneAndUpdate({
                    "_id": user._id
                },
                    {
                        "open_app": open_app
                    }, { new: true }
                );
                var id = await req.body.Jobid;
                // find job
                await Job.findOne({
                    "_id": id
                }, async function (err, user) {
                    if (err) {
                        console.log(err);
                    }
                    var applied = user.applied + 1;
                    const anx = await Job.findOneAndUpdate({
                        "_id":id
                    },{
                        "applied": applied
                    },{new:true});
                    await console.log(anx);
                    console.log ("upar")
                });
                console.log(ans)
                const newApp = new Application({
                    Jobid: req.body.Jobid,
                    recmail: req.body.recmail,
                    jtitle: req.body.jtitle,
                    recname: req.body.recname,
                    salary: req.body.salary,
                    appmail: req.body.appmail,
                    sop: req.body.sop,
                    skills:req.body.skills,
                    appname: req.body.appname
                });
                newApp.save()
                    .then(newApp => res.send(newApp))
                    .catch(err => {
                        return res.status(400).json(err)
                    });
            }
        });

});
router.post("/view", async function (req, res) {
    var email = req.body.mail;
    console.log(email);
    Application.find({
        "appmail": email
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await res.json(user);
        await console.log(user);
    });
});
router.post("/viewx", async function (req, res) {
    var email = req.body.appmail;
    var jobid = req.body.jobid;

    //var x = "rec@gmail.com";
    console.log(jobid);
    Application.find({
        "appmail": email,
        "Jobid": jobid,
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await res.json(user);
        await console.log(user);
        console.log(email);
        // await console.log(user);
    });
});
router.post("/viewrec", async function (req, res) {
    var email = req.body.mail;
    var jtitle = req.body.jtitle;

    //var x = "rec@gmail.com";
    //console.log(jobid);
    Application.find({
        "recmail": email,
        "jtitle": jtitle,
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await res.json(user);
        await console.log(user);
        console.log(email);
        // await console.log(user);
    });
});
module.exports = router;