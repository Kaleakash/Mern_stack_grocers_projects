//Load all required modules 
let app = require("express")();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let cors = require("cors");


const passportJWT = require('./middlewares/passportJWT')();
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require("./routers/user");
const adminRoutes = require("./routers/admin")
const productRoutes = require("./routers/product")
const orderRouter = require("./routers/orders");

//Database URL Details 
let url = "mongodb://localhost:27017/grocers";


//middleware enable data from post method.
app.use(bodyParser.urlencoded({ extended: true })); // enable body part data  
app.use(bodyParser.json()); // json data. 
app.use(cors()); // enable cors policy 
app.use(passportJWT.initialize());

//Database connection without warning 
const mongooseDbOption = { // to avoid warning 
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, mongooseDbOption); //ready to connect 

//Connect the data 
mongoose.connection

app.use('/api/user', userRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/Product', productRoutes);
app.use("/api/Orders",orderRouter)
app.use(errorHandler)


app.listen(9090, () => console.log("Server running on port number 9090"));