//import the express module
import express from 'express';

//import the mysql module
import mysql from 'mysql2';
//import the env module
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_HOST);
//create an express application
const app = express();

//create a connection pool to the MySQL database
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

//test the database connection
app.get('/db-test', async (req, res) => {
    try {
        const pizza_orders = await pool.query("SELECT * FROM orders");
        res.send(pizza_orders[0]);
    } catch (error) {
        console.error('Database connection failed:', err);
    }
});
//define a port number
const PORT = 3000;
//serve static files from the "public" directory
app.use(express.static('public'));

//set EJS as the view engine
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended: true}));//form data and store it in req.body

//create temp order array
const orders = [];




//define our main or default route ("/")
app.get('/', (req, res) => {
    res.render('home');
});
//contact route
app.get(`/contact`, (req, res) => {
    res.render('contact');
});
//confirmation route
app.get(`/thank-you`, (req, res) => {
    res.render('confirmation');
});
//admin route
app.get(`/admin`, (req,res) => {
    res.render('admin' , {orders});
});
//submit order route
app.post(`/submit-order`, (req, res) => {
    
//Create a JSON object to store the order data
    const order = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    method: req.body.method,
    size: req.body.size,
    topping: req.body.topping ? req.body.topping : "none",
    // discounts: req.body.discounts,
    comment: req.body.comment,
    // placeOrderButton: req.body.placeOrderButton,
    timestamp: new Date()
};

//add order object to orders array
orders.push(order);

res.render('confirmation', {order});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});









