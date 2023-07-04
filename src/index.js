const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./dbConnection");

const app = express();
app.use(bodyParser.json());
app.use(express.static("src"));

const PORT = 3000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log("running on port " + PORT);
  } else {
    console.error(err);
  }
});

const createTable = `CREATE TABLE IF NOT EXISTS names (
  id INT AUTO_INCREMENT PRIMARY KEY,
  letter VARCHAR(1) NOT NULL,
  count INT NOT NULL,
  gender VARCHAR(10) NOT NULL
)`;

connection.query(createTable, function (error, results, fields) {
  if (error) throw error;
});

/**
 * GET- endpoint, root page
 * 
 * @returns form page
 * 
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});