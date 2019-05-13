var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "npg12345",
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
   var purchaseItem = function() {
    inquirer
      .prompt([{
        name: "itemId",
        type: "input",
        message: "Which product would you like to buy (ID #)?"
      }, 
      {
        name: "quantity",
        type: "input",
        message: "How many  /* + selectedItem + */ would you like to buy?"
        //choices: [SELECT * queryAllProducts],
        }]).then(function(answer){
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            var selectedItem;
            for (var i = 0; i < res.length; i++) {
              if (res[i].item_id === parseInt(answer.item_id)) {
                selectedItem = res[i];
              }
            }
            if (selectedItem.stock_quantity > parseInt(answer.quantity)) {
              connection.query("UPDATE products SET ? WHERE ?",
             [{ stock_quantity: (selectedItem.stock_quantity - parseInt(answer.quantity))},
            { item_id: selectedItem.item_id}],
            function(error) {
              if (error) throw error;
               console.log("Thank you for shopping with us today! Your bill has came to $" + parseInt(answer.quantity) * selectedItem.price);
            });
            } else {
              console.log("I'm sorry, but we do not have enough  + selectedItem.item_id + in stock right now...");
            }
          });
        });
      };
  
  
  /*
  function query() {
    var query = connection.query("SELECT * FROM songs WHERE genre=?", ["Dance"], function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].title + " | " + res[i].artist + " | " + res[i].genre);
      }
    });
  
    // logs the actual query being run
    console.log(query.sql);
  }
    // function which prompts the user for what action they should take
  function start() {
    inquirer
      .prompt({
        name: "postOrBid",
        type: "list",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["POST", "BID", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === "POST") {
          postAuction();
        }
        else if(answer.postOrBid === "BID") {
          bidAuction();
        } else{
          connection.end();
        }
      });
  }
  
  // function to handle posting new items up for auction
  function postAuction() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item you would like to submit?"
        },
        {
          name: "category",
          type: "input",
          message: "What category would you like to place your auction in?"
        },
        {
          name: "startingBid",
          type: "input",
          message: "What would you like your starting bid to be?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
        connection.query(
          "INSERT INTO auctions SET ?",
          {
            item_name: answer.item,
            category: answer.category,
            starting_bid: answer.startingBid || 0,
            highest_bid: answer.startingBid || 0
          },
          function(err) {
            if (err) throw err;
            console.log("Your auction was created successfully!");
            // re-prompt the user for if they want to bid or post
            start();
          }
        );
      });
  }
  
  function bidAuction() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM auctions", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].item_name);
              }
              return choiceArray;
            },
            message: "What auction would you like to place a bid in?"
          },
          {
            name: "bid",
            type: "input",
            message: "How much would you like to bid?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
  
          // determine if bid was high enough
          if (chosenItem.highest_bid < parseInt(answer.bid)) {
            // bid was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE auctions SET ? WHERE ?",
              [
                {
                  highest_bid: answer.bid
                },
                {
                  id: chosenItem.id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Bid placed successfully!");
                start();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Your bid was too low. Try again...");
            start();
          }
        });
    });
  }
  

  // function which prompts the user for what action they should take
  function start() {
    inquirer
      .prompt({
        name: "postOrBid",
        type: "list",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["POST", "BID", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.postOrBid === "POST") {
          postAuction();
        }
        else if(answer.postOrBid === "BID") {
          bidAuction();
        } else{
          connection.end();
        }
      });
  }
  */