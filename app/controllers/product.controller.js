const sql = require("../models/db.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req.body);

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.title || !req.body.description) {
    res.status(400).send({
      message: "Title and description can not be empty!"
    });
    return;
  }

  var title = req.body.title;
  var date_of_manufacturing = req.body.date_of_manufacturing ? req.body.date_of_manufacturing : '';
  var description = req.body.description ? req.body.description : ''; 
  var date_of_expiry = req.body.date_of_expiry ? req.body.date_of_expiry : '';  
  var dealer_id = req.body.dealer_id ? req.body.dealer_id : ''; 
  var category_id = req.body.category_ID ? req.body.category_ID : ''; 
  var hsn_number = req.body.hsn_number ? req.body.hsn_number : '';
  var bill_date = req.body.bill_date ? req.body.bill_date : ''; 
  var price = req.body.price ? req.body.price : ''; 
  var is_deleted = '0';

  // Create an insert query 
  const insertQuery = `INSERT INTO product (title, date_of_manufacturing, description, date_of_expiry, dealer_id, hsn_number, category_id, bill_date, price, is_deleted) VALUES ('${title}', '${date_of_manufacturing}', '${description}', '${date_of_expiry}', '${dealer_id}', '${hsn_number}', '${category_id}', '${bill_date}', '${price}', '${is_deleted}')`;
  
  sql.query(insertQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the tutorial."
      });
      return;
    }

    console.log("Product created successfully:", result);
    res.status(200).send({
      message: "Product created successfully."
    });
  });
};

// Create and Save a new Tutorial
exports.all_product_list = (req, res) => {
  
 
  var page = req.query.page;
  var start = page-1;
  var per_page_record = req.query.size;
  var start_from = start * per_page_record;
  // Create an insert query 
 
  let query = "select * from  product WHERE is_deleted = '0' ORDER BY id DESC LIMIT "+ start_from + "," + per_page_record;
   
  // Execute the query
  sql.query(query, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the tutorial."
      });
      return;
    } else {
      get_count_product_record(result);
    }

   /* console.log("Product created successfully:", result);
    res.status(200).send({
      message: "Product list received successfully.",
      data : result
    });*/
  });
  function get_count_product_record (response) {
    sql.query(`SELECT COUNT(id) FROM product where is_deleted = 0`, (err, count) => {
    if (err) {
        console.log("error: ", err);
        res.status(400).send({
        message: err.sqlMessage
        });
    } else {
        var string = JSON.stringify(count);
        var json_formate_response =  JSON.parse(string);
        var total_records = json_formate_response[0]['COUNT(id)'];
        var msg = {};
        msg.data = response;
        msg.total_records = total_records;
        res.status(200).send({ message: msg});
           
    }
});
    }



};

exports.findOne = (req, res) => {
   
  var id  = req.params.id;
  const Query = `select * from  product WHERE is_deleted = '0' && id = ${id}`;
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

    
    res.status(200).send({
      message: "Product details received successfully.",
      data : result
    });
  });
}

// Update and Save a new Product
exports.update = (req, res) => {
  console.log(req.body);

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  if (!req.body.id ) {
    res.status(400).send({
      message: "Invalid Id"
    });
    return;
  }

  if (!req.body.title || !req.body.description) {
    res.status(400).send({
      message: "Title and description can not be empty!"
    });
    return;
  }
  

  // Create an insert query 
  const updateQuery = `UPDATE product SET title = '${req.body.title}', description = '${req.body.description}', is_deleted = '0' WHERE id = ${req.body.id}`;

  // Execute the query
  sql.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while updating  the product."
      });
      return;
    }

    console.log("Product updated successfully:", result);
    res.status(200).send({
      message: "Product updated successfully."
    });
  });
};


// delete   Product
exports.delete = (req, res) => {
  console.log(req.body);
 
  if (!req.body.id ) {
    res.status(400).send({
      message: "Invalid Id"
    });
    return;
  }
 

  // Create an insert query 
  const deleteQuery = `UPDATE product SET is_deleted = '1' WHERE id = ${req.body.id}`;

  // Execute the query
  sql.query(deleteQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while updating  the product."
      });
      return;
    }

    console.log("Product deleted successfully:", result);
    res.status(200).send({
      message: "Product deleted successfully."
    });
  });
};