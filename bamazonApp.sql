SELECT * FROM bamazon.products;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(120) NOT NULL,
  `department_name` varchar(60) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1