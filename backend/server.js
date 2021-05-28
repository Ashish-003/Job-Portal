const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "tutorial"

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/Users");
var jobRouter = require("./routes/Addjob");
var appRouter = require("./routes/Addapp");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true });
mongoose.set('useFindAndModify', false);
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endprequired: false,oints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job",jobRouter);
app.use("/app",appRouter);
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
