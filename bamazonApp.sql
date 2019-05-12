SELECT * FROM bamazon.products;

CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(120) NOT NULL,
  `department_name` varchar(60) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1

# item_id, product_name, department_name, price, stock_quantity
6, ryzen 7 2700x, electronics, 310, 15

'rtx2080ti'

'4', 'socks', 'clothing', '1', '1100'
# item_id, product_name, department_name, price, stock_quantity
'1', 'bananas ', 'grocery', '0', '100'
3	headphones	electronics	150	4
'mulch'
'7', 'mulch', 'lawn/garden', '15', '65'
'mulch'
item_id, product_name, department_name, price, stock_quantity
# item_id, product_name, department_name, price, stock_quantity
3, headphones, electronics, 150, 4
`bamazon`.`products`
bamazon.products	analyze	status	OK