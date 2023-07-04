const express = require("express");
const bodyParser = require('body-parser')
const connection = require('./dbConnection');

const app = express();
app.use(bodyParser.json())
app.use(express.static('src'));

const PORT = 3000


app.listen(PORT, (err) => {
    if(!err) {
        console.log("running on port " + PORT);
    }
    else {
        console.error(err);
    }
})


/**
 * GET endpoint, root page
 * 
 * @returns form page
 * 
 */
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
});