const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./dbConnection");

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());

app.use(express.static("src"));

const PORT = 3000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log("running on port " + PORT);
  } else {
    console.error(err);
  }
});

const createTableQuery = `CREATE TABLE IF NOT EXISTS names (
  id INT AUTO_INCREMENT PRIMARY KEY,
  letter VARCHAR(1) NOT NULL,
  count INT NOT NULL,
  gender VARCHAR(10) NOT NULL
)`;

connection.query(createTableQuery, function (error, results, fields) {
  if (error) throw error;
});

const insertDataQuery = `
INSERT INTO names (letter, count, gender)
VALUES
('a', 0, 'male'), ('a', 0, 'female'),
('b', 0, 'male'), ('b', 0, 'female'),
('c', 0, 'male'), ('c', 0, 'female'),
('d', 0, 'male'), ('d', 0, 'female'),
('e', 0, 'male'), ('e', 0, 'female'),
('f', 0, 'male'), ('f', 0, 'female'),
('g', 0, 'male'), ('g', 0, 'female'),
('h', 0, 'male'), ('h', 0, 'female'),
('i', 0, 'male'), ('i', 0, 'female'),
('j', 0, 'male'), ('j', 0, 'female'),
('k', 0, 'male'), ('k', 0, 'female'),
('l', 0, 'male'), ('l', 0, 'female'),
('m', 0, 'male'), ('m', 0, 'female'),
('n', 0, 'male'), ('n', 0, 'female'),
('o', 0, 'male'), ('o', 0, 'female'),
('p', 0, 'male'), ('p', 0, 'female'),
('q', 0, 'male'), ('q', 0, 'female'),
('r', 0, 'male'), ('r', 0, 'female'),
('s', 0, 'male'), ('s', 0, 'female'),
('t', 0, 'male'), ('t', 0, 'female'),
('u', 0, 'male'), ('u', 0, 'female'),
('v', 0, 'male'), ('v', 0, 'female'),
('w', 0, 'male'), ('w', 0, 'female'),
('x', 0, 'male'), ('x', 0, 'female'),
('y', 0, 'male'), ('y', 0, 'female'),
('z', 0, 'male'), ('z', 0, 'female')
`;

const checkDataQuery = `SELECT COUNT(*) AS count FROM names`
  
connection.query(checkDataQuery, function (error, results, fields) {
    if (error) throw error;
    
    let count = results[0].count;
    
    // Insert data into the database if it is empty
    if (count === 0) {
      connection.query(insertDataQuery, function (error, results, fields) {
        if (error) throw error;
      });
    }
  });


/**
 * GET endpoint, root page
 * 
 * @returns form page
 * 
 */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});


/**
 * POST endpoint, edit count of letter
 * 
 * @params entered name in form
 * @params selected gender in form 
 * @returns chart page
 * 
 */
app.post("/postName", (req, res) => {
    const name = req.body.name
    const gender = req.body.gender

    const firstLetter = name.charAt(0).toLowerCase()
    //console.log(firstLetter)

    const updateLetterCountQuery = `UPDATE names SET count = count + 1 WHERE letter = "${firstLetter}" AND gender = "${gender}"`

    connection.query(updateLetterCountQuery, function (error, results, fields) {
        if (error) throw error;
        res.redirect("/chart");
      });
})

/**
 * GET endpoint, chart page
 * 
 * @returns chart page
 * 
 */
app.get("/chart", (req, res) => {
  res.sendFile(__dirname + "/chart.html");
});