const sql = require("../models/db.js");

 
exports.create = (req, res) => {
  console.log(req.body);

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.category ) {
    res.status(400).send({
      message: "Category can not be empty!"
    });
    return;
  }

  var category = req.body.category;
  var parent_cat_id = req.body.cat_parent_id ? req.body.cat_parent_id : '0'; 
  var is_deleted = '0';

  // Create an insert query 
  const insertQuery = `INSERT INTO category (name, parent_cat_id, is_deleted) VALUES ('${category}', '${parent_cat_id}', '${is_deleted}')`;
  
  sql.query(insertQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the category."
      });
      return;
    }

    console.log("Category created successfully:", result);
    res.status(200).send({
      message: "Category created successfully."
    });
  });
};


// Create and Save a new Tutorial
exports.all_list = (req, res) => {
   
  // Create an insert query 
  let query = "select `id` as 'value', `name` as 'label'  from  category WHERE is_deleted = '0' ORDER BY id DESC ";
   
  // Execute the query
  sql.query(query, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while fetching the list of category."
      });
      return;
    } else {
      var msg = {};
      msg.data = result;
      res.status(200).send({ message: msg});
    }

   /* console.log("Product created successfully:", result);
    res.status(200).send({
      message: "Product list received successfully.",
      data : result
    });*/
  });

};

  

// Create and Save a new Tutorial
exports.list_table = (req, res) => {
  
 
  var page = req.query.page;
  var start = page-1;
  var per_page_record = req.query.size;
  var start_from = start * per_page_record;
  // Create an insert query 
 
  let query = "SELECT c.id, c.name, c.parent_cat_id, c.created_at, c.is_deleted,  COALESCE(p.name, '-') AS parent_category_name FROM category c LEFT JOIN category p ON c.parent_cat_id = p.id WHERE c.is_deleted = '0' GROUP BY c.parent_cat_id, c.id ORDER BY c.id DESC LIMIT "+ start_from + "," + per_page_record;
   
  // Execute the query
  sql.query(query, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while getting the category list ."
      });
      return;
    } else {
      get_count_category_record(result);
    }

   /* console.log("Product created successfully:", result);
    res.status(200).send({
      message: "Product list received successfully.",
      data : result
    });*/
  });
  function get_count_category_record (response) {
    sql.query(`SELECT COUNT(id) FROM category where is_deleted = 0`, (err, count) => {
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


exports.single_details = (req, res) => {
  var id = req.query.cat_id;
  let query = "SELECT id, name, parent_cat_id  FROM category  WHERE category.is_deleted = '0' AND category.id = "+id ;
   
  // Execute the query
  sql.query(query, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while getting the category details ."
      });
      return;
    } else {
      var msg = {};
      msg.data = result;
      msg.type = 'success'
 
      res.status(200).send({ message: msg});
    }
});
}


exports.single_update = (req, res) => {
  console.log(req.body); 
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.category  || !req.query.categoryId) {
    res.status(400).send({
      message: "Category Or ID Not valid!"
    });
    return;
  }

  var category = req.body.category;
  var parent_cat_id = req.body.cat_parent_id ? req.body.cat_parent_id : '0'; 
  var is_deleted = '0';

  // Create an insert query  

  const updateQuery = `UPDATE category SET name = '${category}', parent_cat_id = '${parent_cat_id}', is_deleted = '0' WHERE id = ${req.query.categoryId}`;
  
  sql.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the category."
      });
      return;
    }

    console.log("Category Updated successfully:", result);
    res.status(200).send({
      message: "Category Updated successfully."
    });
  });
};



exports.single_delete = (req, res) => {
  console.log(req.body); 
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  if (!req.body.id  ) {
    res.status(400).send({
      message: "Category ID Not valid!"
    });
    return;
  } 
  var is_deleted = '1';

  // Create an insert query  

  const updateQuery = `UPDATE category SET  is_deleted = '${is_deleted}' WHERE id = ${req.body.id}`;
  
  sql.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the category."
      });
      return;
    }

    console.log("Category Deleted successfully:", result);
    res.status(200).send({
      message: "Category Deleted successfully."
    });
  });
};
