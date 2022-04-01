### Order_Management_Backend

## Create Order Management App with the below inputs.

1. Application should be designed in Angular and Node js endpoints
2. Overview: application should contain 4 roles (Admin , Dealer, Shopkeeper, Representative ), here admin is company owned employee(manager)

# Admin roles:

1. Admin should be able to add Dealers, Shopkeepers with shops, Representatives. 
2. Admin or manager should be able to add products with required parameters like product name, id, price etc..
3. Should have the all access which Dealers, shopkeepers and representative’s have.

# Dealer: 

1. Should be able to perform bulk orders towards the company and able to track status, only the admin and Dealer can view and modify the status of the orders
2. Should able to track orders which are ordered by shopkeepers.
 
# Shopkeeper : 

1. Able to order products towards Dealers, and able to track them. Here, order can be tracked by dealers, shopkeepers and representatives.
2. Shopkeepers should have limited access, they can track the orders which they order towards deodars or they can track the orders provided by the representative for that shop.

# Representatives: 

1. Able to add shopkeepers along with shops, 
2. Able to add his daily Visit details, 
3. Able to order products after visiting the shop.
4. Once order is placed it has to be confirmed by the shopkeeper.
5. Representative orders can be tracked or viewed by manager/Admin
6. Need to Save Product Images.
