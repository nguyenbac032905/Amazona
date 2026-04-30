# MERN AMAZONA

# LESSON 
1. Introduction
2. Install tools
3. Create react app
4. Create git repository
5. List product
    1. create products array
    2. add product image
    3. render products
    4. style products
6. add routing
    1. npm i react-router-dom
    2. create route for home screen
    3. create route for product screen
7. Create nodejs server
    1. run npm init in root folder
    2. update package.json set type: module
    3. add .js to imports
    4. npm install express
    5. create server.js
    6. add start command as node backend/server.js
    7. require express
    8. create route for / return backend is ready
    9. move product.js from frontend to backend
    10. create route for /api/product
    11. return products
    12. run npm start
8. Fetch Products From Backend
    1. set proxy in package.json
    2. npm install axios
    3. use state hook
    4. use effect hook
    5. use reducer hook
9. Manage State By Reducer Hook
    1. define reducer
    2. update fetch data
    3. get state from usReducer
10. add bootstrap ui framework
    1. npm i react-bootstrap bootstrap
    2. update app.js
11. Create Product and Rating Component
    1. create Rating component
    2. Create Product component
    3. Use Rating component in Product component
12. create product detail screen
    1. fetch product from backend
    2. create 3 column  image,info, action
13. Create Loading and Message Component
    1. create loading component
    2. use spinner component
    3. craete message component
    4. create utils.js to define getError fuction
14. Implement Add To Cart
    1. Create React Context
    2. define reducer
    3. create store provider
    4. implement add to cart button click handler
16. Create Cart Screen
    1. create 2 columns
    2. display items list
    3. create action column
17. Complete Cart Screen
    1. click handler for inc/dec item
    2. click handler for remove item
    3. click handler for checkout
22. Create Signin Backend API
    1. create signin api
    2. npm install jsonwebtoken
    3. define generateToken
                