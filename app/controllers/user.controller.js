const sql = require("../models/db.js");
const bcrypt = require('bcrypt');
const config = require('../config/config.js');
const jwt = require('jsonwebtoken'); 

// Create and Save a new Tutorial
exports.create = async(req, res) => {
  console.log(req.body);

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Please fill all the field"
    });
    return;
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  console.log(hashedPassword);

  // Create an insert query 
  const insertQuery = `INSERT INTO users (first_name, last_name, email, password, is_deleted) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hashedPassword}', '0')`;
  // Execute the query
  sql.query(insertQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the tutorial."
      });
      return;
    }

    console.log("user created successfully:", result);


    res.status(200).send({
      message: "user created successfully."
    });
  });
};


exports.login = (req, res) => {
   
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  if (!req.body.email || !req.body.password ) {
    res.status(400).send({
      message: "email or password is invaild"
    });
    return;
  }
  email = req.body.email;
  password = req.body.password;
  const Query = `select * from  users WHERE is_deleted = '0' && email = '${email}' && password='${password}'`;
  console.log(Query);
  // Execute the query
  sql.query(Query, (err, result) => {
    if (err) {
      console.error("Error executing fetching query:", err);
      res.status(500).send({
        message: "Error executing fetching query."
      });
      return;
    }
    const token = jwt.sign({ userId: email }, config.jwtSecret, { expiresIn: '10h' });
    
    res.status(200).send({
      message: "Login Successfully",
      data : result,
      token_details : token
    });
  });
}

