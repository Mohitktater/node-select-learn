module.exports = app => {  

  var router = require("express").Router();

 const Product_routes = require('./product_routes');
 const User_routes = require('./user_routes');
 const Blog_routes = require('./blog_routes')
 const Auth_routes = require('./auth_routes');
 

    app.use('/api/products', Product_routes);
    app.use('/api/users', User_routes);
    app.use('/api/blog', Blog_routes);
    app.use('/api/auth', Auth_routes);
   
};
