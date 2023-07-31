const express = require("express");
const bodyParser = require("body-parser");

const connection = require("./helpers/dbConnection");
const { checkName } = require("./helpers/checkName");

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


/**
 * Create table for names
 */
const createNamesTableQuery = `CREATE TABLE IF NOT EXISTS names (
  id INT AUTO_INCREMENT PRIMARY KEY,
  letter VARCHAR(1) NOT NULL,
  count INT NOT NULL,
  gender VARCHAR(10) NOT NULL
)`;

connection.query(createNamesTableQuery, function (error, results, fields) {
  if (error) throw error;
});

const insertNameDataQuery = `
INSERT INTO names (letter, count, gender)
VALUES
('a', 5, 'male'), ('a', 6, 'female'),
('b', 0, 'male'), ('b', 0, 'female'),
('c', 0, 'male'), ('c', 0, 'female'),
('d', 0, 'male'), ('d', 0, 'female'),
('e', 0, 'male'), ('e', 2, 'female'),
('f', 0, 'male'), ('f', 0, 'female'),
('g', 0, 'male'), ('g', 0, 'female'),
('h', 1, 'male'), ('h', 2, 'female'),
('i', 0, 'male'), ('i', 0, 'female'),
('j', 0, 'male'), ('j', 0, 'female'),
('k', 0, 'male'), ('k', 0, 'female'),
('l', 0, 'male'), ('l', 0, 'female'),
('m', 4, 'male'), ('m', 2, 'female'),
('n', 0, 'male'), ('n', 3, 'female'),
('o', 0, 'male'), ('o', 0, 'female'),
('p', 0, 'male'), ('p', 0, 'female'),
('q', 0, 'male'), ('q', 0, 'female'),
('r', 0, 'male'), ('r', 2, 'female'),
('s', 3, 'male'), ('s', 2, 'female'),
('t', 1, 'male'), ('t', 2, 'female'),
('u', 1, 'male'), ('u', 0, 'female'),
('v', 0, 'male'), ('v', 0, 'female'),
('w', 0, 'male'), ('w', 0, 'female'),
('x', 0, 'male'), ('x', 0, 'female'),
('y', 0, 'male'), ('y', 0, 'female'),
('z', 1, 'male'), ('z', 0, 'female')
`;


const checkNameDataQuery = `SELECT COUNT(*) AS count FROM names`
  
connection.query(checkNameDataQuery, function (error, results, fields) {
  if (error) throw error;
  
  let count = results[0].count;
  
  // Insert data into the database if it is empty
  if (count === 0) {
    connection.query(insertNameDataQuery, function (error, results, fields) {
      if (error) throw error;
    });
  }
});

/**
 * Create table for favorite colors
 */
const createColorTableQuery = `CREATE TABLE IF NOT EXISTS colors (
  id INT AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(255) NOT NULL,
  count INT NOT NULL,
  gender VARCHAR(10) NOT NULL
)`;
connection.query(createColorTableQuery, function (error, results, fields) {
  if (error) throw error;
});
const insertColorDataQuery = `
INSERT INTO colors (color, count, gender)
VALUES
('red', 5, 'male'), ('red', 6, 'female'),
('yellow', 0, 'male'), ('yellow', 0, 'female'),
('green', 0, 'male'), ('green', 0, 'female'),
('blue', 0, 'male'), ('blue', 0, 'female'),
('purple', 0, 'male'), ('purple', 2, 'female'),
('pink', 0, 'male'), ('pink', 0, 'female'),
('white', 0, 'male'), ('white', 0, 'female'),
('black', 1, 'male'), ('black', 2, 'female'),
('none of the above', 0, 'male'), ('none of the above', 0, 'female')
`;
const checkColorDataQuery = `SELECT COUNT(*) AS count FROM colors`
  
connection.query(checkColorDataQuery, function (error, results, fields) {
  if (error) throw error;
  
  let count = results[0].count;
  
  // Insert data into the database if it is empty
  if (count === 0) {
    connection.query(insertColorDataQuery, function (error, results, fields) {
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
 * POST endpoint, edit count of letter and color
 * 
 * @params entered name in form
 * @params selected gender in form 
 * @params selected color in form 
 * @returns chart
 * 
 */
app.post("/postName", async(req, res) => {
  const name = req.body.name
  const gender = req.body.gender
  const color = req.body.color

  try{
    const firstLetter = await checkName(name)
    const updateLetterCountQuery = `UPDATE names SET count = count + 1 WHERE letter = "${firstLetter}" AND gender = "${gender}"`
    const updateColorCountQuery = `UPDATE colors SET count = count + 1 WHERE color = "${color}" AND gender = "${gender}"`
  
    connection.query(updateLetterCountQuery, function (error, results, fields) {
      if (error) throw error;
    });
    connection.query(updateColorCountQuery, function (error, results, fields) {
      if (error) throw error;
      res.redirect("/chartNames");
    });
  } catch (error) {
    res.send(`<script>alert("${error.message}"); window.location.href = "/"; </script>`);
  }
})


/**
 * GET endpoint, chart page with first letters
 * 
 * @returns chart page
 */
app.get("/chartNames", (req, res) => {
  const maleCountQuery = `SELECT count FROM names WHERE gender = "male"`;
  const totalMaleQuery = `SELECT SUM(count) FROM names WHERE gender = "male"`;
  const femaleCountQuery = `SELECT count FROM names WHERE gender = "female"`;
  const totalFemaleQuery = `SELECT SUM(count) FROM names WHERE gender = "female"`;

  let males = [];
  let totalMales = 0
  let females = [];
  let totalFemales = 0

  connection.query(totalMaleQuery, function(error, results, fields){
    if (error) throw error;
    totalMales = results[0]['SUM(count)']
    
    connection.query(totalFemaleQuery, function(error, results, fields){
      if (error) throw error;
      totalFemales = results[0]['SUM(count)']
      
      connection.query(maleCountQuery, function (error, results, fields) {
        if (error) throw error;
        results.forEach(element => {
          males.push((element.count / totalMales) * 100);
        });
        
        connection.query(femaleCountQuery, function (error, results, fields) {
          if (error) throw error;
          results.forEach(element => {
            females.push((element.count / totalFemales) * 100);
          });
          
          const chart = `
          <div>
          <canvas id="myChart"></canvas>
          </div>

          <button onclick="goToColorsChart()">View chart for favorite colors</button>
          <br> <br>
          <button onclick="goBack()">Add another name</button>
          
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          
          <script>

          function goToColorsChart() {
            window.location.href = "/chartColors"
          }
          function goBack() {
            window.location.href = "/";
          }

          const ctx = document.getElementById('myChart');
          
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
              datasets: [
                {
                  label: "Males",
                  backgroundColor: 'rgba(0, 0, 255, 0.3)',
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1,
                  data: ${JSON.stringify(males)}
                },
                {
                  label: "Females",
                  backgroundColor: 'rgba(255, 192, 203, 0.5)',
                  borderColor: 'rgb(255, 192, 203)',
                  borderWidth: 1,
                  data: ${JSON.stringify(females)}
                }
              ]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Number of occurences of a letter as first letter in first names (in %)',
                  font: {
                    size: 25
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }
          });
          </script>
          `;
          
          res.send(chart);
        });
      });
    });
  });
});

/**
 * GET endpoint, chart page with favorite colors
 * 
 * @returns chart page
 */
app.get("/chartColors", (req, res) => {
  const maleCountQuery = `SELECT count FROM colors WHERE gender = "male"`;
  const totalMaleQuery = `SELECT SUM(count) FROM colors WHERE gender = "male"`;
  const femaleCountQuery = `SELECT count FROM colors WHERE gender = "female"`;
  const totalFemaleQuery = `SELECT SUM(count) FROM colors WHERE gender = "female"`;

  let males = [];
  let totalMales = 0
  let females = [];
  let totalFemales = 0

  connection.query(totalMaleQuery, function(error, results, fields){
    if (error) throw error;
    totalMales = results[0]['SUM(count)']
    
    connection.query(totalFemaleQuery, function(error, results, fields){
      if (error) throw error;
      totalFemales = results[0]['SUM(count)']
      
      connection.query(maleCountQuery, function (error, results, fields) {
        if (error) throw error;
        results.forEach(element => {
          males.push((element.count / totalMales) * 100);
        });
        
        connection.query(femaleCountQuery, function (error, results, fields) {
          if (error) throw error;
          results.forEach(element => {
            females.push((element.count / totalFemales) * 100);
          });
          
          const chart = `
          <div>
          <canvas id="myChart"></canvas>
          </div>

          <button onclick="goToNamesChart()">View chart for occurences of first letter</button>
          <br> <br>
          <button onclick="goBack()">Add another name</button>
          
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          
          <script>

          function goToNamesChart() {
            window.location.href = "/chartNames";
          }

          function goBack() {
            window.location.href = "/";
          }

          const ctx = document.getElementById('myChart');
          
          new Chart(ctx, {
            type: "bar",
            data: {
              labels: ['red', 'yellow', 'green', 'blue', 'purple', 'pink', 'white', 'black', 'none of the above'],
              datasets: [
                {
                  label: "Males",
                  backgroundColor: 'rgba(0, 0, 255, 0.3)',
                  borderColor: 'rgb(0, 0, 255)',
                  borderWidth: 1,
                  data: ${JSON.stringify(males)}
                },
                {
                  label: "Females",
                  backgroundColor: 'rgba(255, 192, 203, 0.5)',
                  borderColor: 'rgb(255, 192, 203)',
                  borderWidth: 1,
                  data: ${JSON.stringify(females)}
                }
              ]
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Favorite color per gender (in %)',
                  font: {
                    size: 25
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }
          });
          </script>
          `;
          
          res.send(chart);
        });
      });
    });
  });
});