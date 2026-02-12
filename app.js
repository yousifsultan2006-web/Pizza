//import the express module
import express from 'express';

//create an express application
const app = express();

//define a port number
const PORT = 3000;
//serve static files from the "public" directory
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));//form data and store it in req.body

//create temp order array
const orders = [];




//define our main or default route ("/")
app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});
//contact route
app.get(`/contact`, (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/Contact.html`);
});
//confirmation route
app.get(`/thank-you`, (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});
//admin route
app.get(`/admin`, (req,res) => {
    res.send(orders);
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
    topping: req.body.topping ? req.body.toppings : "none",
    discounts: req.body.discounts,
    comment: req.body.comment,
    placeOrderButton: req.body.placeOrderButton,
    timestamp: new Date()
};

//add order object to orders array
orders.push(order);

res.sendFile(`${import.meta.dirname}/views/confirmation.html`)
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});









