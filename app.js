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
app.get(`/admin`, async(req,res) => {
    

    //read the orders from the database
    //newest first
    let sql = "SELECT * FROM orders ORDER BY timestamp DESC";
    const orders = await pool.query(sql)
    console.log(orders);
    res.render('admin', { orders: orders[0] });
});
//submit order route
app.post(`/submit-order`, async (req, res) => {
    const order = req.body;
    
//Create an array of order data
    const params = [
    order.fname,
    order.lname,
    order.email,
    order.size,
    order.method, 
    Array.isArray(order.topping) ? order.topping.join(", ") : "none",
    // discounts: req.body.discounts,
     //req.body.comment,
    // placeOrderButton: req.body.placeOrderButton,
    ];

    //insert new order into the database
    const sql = `INSERT INTO orders (fname, lname, email, size, method, topping)
     VALUES (?, ?, ?, ?, ?, ?)`;

    const result = await pool.execute(sql, params)
    console.log("order inserted with ID: ", result[0].insertId)

//add order object to orders array

res.render('confirmation', {order});
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});









