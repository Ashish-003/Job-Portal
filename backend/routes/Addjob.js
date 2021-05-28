var express = require("express");
var router = express.Router();

const ls = require("local-storage");
var MongoClient = require("mongodb");

//validation
const validateJobInput = require("../check/job");
const Application = require("../models/application");
//Add models
const Job = require("../models/Job");
const { route } = require("./Users");

router.get("/", function (req, res) {
    Job.find({
        time: { "$gte": Date.now() }
    })
    .then( async users =>{
        await console.log(users);
        await res.json(users);
    })
    .catch(err => {
        res.status(400).send(err);
    });
});

router.post("/create", (req, res) => {
    const Job = require("../models/Job");
    const { errors, isValid } = validateJobInput(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const newJob = new Job({
        title: req.body.title,
        recname: req.body.recname,
        recmail: req.body.recmail,
        num_app: req.body.num_app,
        position: req.body.position,
        pos_left: req.body.position,
        jobtype: req.body.jobtype,
        duration: req.body.duration,
        salary: req.body.salary,
        time: req.body.time
    });
    newJob.save()
        .then(newJob => res.send(newJob))
        .catch(err => {
            return res.status(400).json(err)
        });
});

// Getting all the users
// router.get("/view", function (req, res) {
//     var url = "mongodb://localhost:27017/tutorial";
//     MongoClient.connect(url, function (err, db) {
//         if (err) throw err;
//         var dbo = db.db("tutorial");
//         var mail = req.body.mail;
//         console.log(mail);
//         var query = {"recname": "rec"};
//         console.log("yo");
//          dbo.collection("Job").find().toArray({},async function(err,all){
//             if(err) throw err;
//             await console.log(all);
//             console.log("hehe");
//         });
//         console.log(query);
//         dbo.collection("Job")
//             .find(query)
//             .toArray( async function (err, result) {
//                 if (err) throw err;
//                 await res.send(result);
//                 console.log(result);
//                 db.close();
//             });
//     });
// });
router.post("/view", async function (req, res) {
    var email = req.body.mail;
    var x = "rec@gmail.com";
    Job.find({
        "recmail": email,
        "status": "active"
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await res.json(user);
        console.log(email);
        // await console.log(user);
    });
});
router.post("/viewi", async function (req, res) {
    var jid = req.body.id;
    var x = "rec@gmail.com";
    Job.find({
        "_id": jid
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await res.json(user);
        console.log("jid");
        console.log(jid);
        // await console.log(user);
    });
});
router.post("/viewx", async function (req, res) {
    var email = req.body.mail;
    var jtitle = req.body.title;

    var x = "rec@gmail.com";
    console.log(jtitle);
    Job.findOne({
        "recmail": email,
        "status": "active",
        "title": jtitle
    }, async function (err, user) {
        if (err) {
            console.log(err);
        }
        await res.json(user);
        console.log(email);
        // await console.log(user);
    });
});
router.post("/delete", async function (req, res) {
    var email = req.body.mail;
    var jtitle = req.body.title;
    const ans = await Job.findOneAndDelete({
        "recmail": email,
        "title": jtitle
    });
    //const asn = await Application.findByIdAndDelete()
    res.json({ message: "successful" });
});
router.post("/edit", async function (req, res) {
    var email = req.body.mail;
    var jtitle = req.body.title;
    var num_app = req.body.num_app;
    var position = req.body.position;
    var dtime = req.body.time;
    const ans = await Job.findOneAndUpdate({
        "recmail": email,
        "title": jtitle
    }, {
        "num_app": num_app,
        "position": position,
        "pos_left": position,
        "time": dtime
    }, {
        new: true
    }
    );
    res.json(ans);
    res.json({ message: "Edit successful" });
});

module.exports = router;