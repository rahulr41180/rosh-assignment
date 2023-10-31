
const express = require("express");

const cors = require("cors");
const path =  require("path");
const dotenv =  require("dotenv");
const bodyParser =  require("body-parser");

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(path.resolve(__dirname, "public")));

const productDetailsRouter = require("./routers/productDetailsRoute.js");

app.use("/api/product", productDetailsRouter);


// PORT
const PORT = process.env.PORT || 8080;


// Funtion for run the server
app.listen(PORT, async () => {
    try {
        console.log(`Server running on ${process.env.DEV_MODE} mode on ${PORT}.....`);

        // await connectDB();

    } catch (error) {

        console.log(`Error in server connection on port ${PORT} :`, error);

    }
})