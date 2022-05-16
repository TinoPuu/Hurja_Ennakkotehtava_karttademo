const express = require('express');
const port = 5000;
const mysql = require("mysql");
var cors = require('cors');
var bodyParser = require('body-parser')



//database information
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'password',
    database: 'hurja'
});
//Database connnection
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("Database connected!")
})

const app = express();
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/kartta1', (req, res) => {
    let sql = 'SELECT * FROM kartta'
    let query = db.query(sql, (err,results)=>{
        if(err) throw err;
        res.json(results);
        console.log("/get coordinates")
    })
  
})

app.post('/kartta2', function(req, res){
    var sql = "INSERT INTO `kartta`(`lat_kartta`,`lng_kartta`,`data_kartta`) VALUES ('"+req.body.latitude+"','"+req.body.longitude+"','"+req.body.value+"')";
    db.query(sql, function(err, result){
        if(err) throw err;
            console.log("coordinates inserted!");
        });
        res.json("Sended")
    });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})