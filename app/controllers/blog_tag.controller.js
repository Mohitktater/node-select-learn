const sql = require("../models/db.js");

 
exports.create = (req, res) => {
  console.log(req.body);

  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "tag can not be empty!"
    });
    return;
  }

  if (!req.body.tag ) {
    res.status(400).send({
      message: "tag can not be empty!"
    });
    return;
  }

  var tag = req.body.tag; 
  var is_deleted = '0';

  // Create an insert query 
  const insertQuery = `INSERT INTO tag (name,  is_deleted) VALUES ('${tag}', '${is_deleted}')`;
  
  sql.query(insertQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the tag."
      });
      return;
    }

    console.log("tag created successfully:", result);
    res.status(200).send({
      message: "tag created successfully."
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
 
  let query = "SELECT * from tag WHERE is_deleted = '0'  ORDER BY id DESC LIMIT "+ start_from + "," + per_page_record;
   
  // Execute the query
  sql.query(query, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while getting the category list ."
      });
      return;
    } else {
      get_count_tag_record(result);
    }

   /* console.log("Product created successfully:", result);
    res.status(200).send({
      message: "Product list received successfully.",
      data : result
    });*/
  });
  function get_count_tag_record (response) {
    sql.query(`SELECT COUNT(id) FROM tag where is_deleted = 0`, (err, count) => {
    if (err) {
        console.log("error: ", err);
        res.status(400).send({
        message: err.sqlMessage
        });ˀˀˀ
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
      var id = req.query.tag_id;
      let query = "SELECT * FROM tag  WHERE tag.is_deleted = '0' && id ="+id;
       
      // Execute the query
      sql.query(query, (err, result) => {
        if (err) {
          console.error("Error executing select query:", err);
          res.status(500).send({
            message: "Error occurred while getting the tag details ."
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
    
      if (!req.body.tag  || !req.query.tagId) {
        res.status(400).send({
          message: "Tag Or ID Not valid!"
        });
        return;
      }
    
      var tag = req.body.tag; 
      // Create an insert query  
    
      const updateQuery = `UPDATE tag SET name = '${tag}', is_deleted = '0' WHERE id = ${req.query.tagId}`;
      
      sql.query(updateQuery, (err, result) => {
        if (err) {
          console.error("Error executing update query:", err);
          res.status(500).send({
            message: "Error occurred while updating the tag."
          });
          return;
        }
    
        console.log("Tag Updated successfully:", result);
        res.status(200).send({
          message: "Tag Updated successfully."
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

  const updateQuery = `UPDATE tag SET  is_deleted = '${is_deleted}' WHERE id = ${req.body.id}`;
  
  sql.query(updateQuery, (err, result) => {
    if (err) {
      console.error("Error executing insert query:", err);
      res.status(500).send({
        message: "Error occurred while creating the tag."
      });
      return;
    }

    console.log("Tag Deleted successfully:", result);
    res.status(200).send({
      message: "Tag Deleted successfully."
    });
  });
};

    
    

