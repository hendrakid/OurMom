const mongoose = require("mongoose");
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Data = require("./data");
// untuk cross origin
const cors = require('cors')


const API_PORT = 3001;
const app = express();
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://ecomindo:p4ssw0rd@ds149511.mlab.com:49511/ourmomdb";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// untuk cross origin
app.use(cors())






// Serve the static files from the React app
app.use(express.static(path.join(__dirname, './client/build')));

// // An api endpoint that returns a short list of items
// app.get('/api/getList', (req,res) => {
//     var list = ["item1", "item2", "item3"];
//     res.json(list);
//     console.log('Sent list of items');
// });


// this is our get method
// this method fetches all available data in our database
router.get("/getData", (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});



// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
  const { id } = req.body;
  Data.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
  let data = new Data();

  const {username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.username = username;
  data.password = password;
  data.role = role;
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// append /api for our http requests
app.use("/api", router);
// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname+'./client/build/index.html'));
});

// launch our backend into a port
// app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

app.listen((process.env.PORT || API_PORT), function(){
  console.log(`LISTENING ON PORT ${API_PORT}`)
});