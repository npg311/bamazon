var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
/*connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });  */
  
  connection.connect(function(err) {
    if (err) throw err;

      
    console.log("--------------------------------------------- ");
    console.log("--------------------------------------------- ");
    console.log("-------------Welcome to BAMAZON!------------- ");
    console.log("--------------------------------------------- ");
    console.log("--------------------------------------------- ");
    console.log("You are Customer Number " + connection.threadId);
    console.log("Please select which product you would like to purchase!");
    console.log("");
    queryAllProducts();
   /* queryDanceSongs(); */
  });

  function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log("Item #: " + res[i].item_id + " | " +
                    "Product: " + res[i].product_name + " | " +
                    "Department " + res[i].department_name + " | " +
                    "Price: " + res[i].price + " | " +
                    "In Stock: " + res[i].stock_quantity);
      
      console.log("---------------------------------------------");
      }
      purchaseItem();
    });
  }
   var purchaseItem = function start() {
    inquirer
      .prompt([{
        name: "itemId",
        type: "input",
        message: "Which product would you like to buy (Item #)?"
      }, 
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
         //choices: [SELECT * queryAllProducts],
        }]).then(function(answer){
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            var selectedItem;
            for (var i = 0; i < res.length; i++) {
              if (res[i].item_id === parseInt(answer.itemId)) {
                selectedItem = res[i];
              }
            }
            if (selectedItem.stock_quantity >= parseInt(answer.quantity)) {
              connection.query("UPDATE products SET ? WHERE ?",
             [{ stock_quantity: (selectedItem.stock_quantity - parseInt(answer.quantity))},
            { item_id: selectedItem.item_id}],
            function(error) {
              if (error) throw error;
               console.log("Thank you for shopping with us today! Your bill has came to $" + parseInt(answer.quantity) * selectedItem.price);
            });
            } else {
              console.log("I'm sorry, but we do not have enough "  + selectedItem.product_name + " in stock right now...");
            }
          });
        });
      };
  
  
  