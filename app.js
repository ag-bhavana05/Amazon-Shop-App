require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/conn");
const cookieParser = require("cookie-parser");


const Products = require("./models/productsSchema");
const DefaultData = require("./defaultdata");
const cors = require("cors");
const path = require("path");
const router = require("./routes/router");


app.use(express.json());
app.use(cookieParser(""));
app.use(cors());
app.use(router);

if(process.env.NODE_ENV === "production"){
    app.get("/", (req,res) => {
        app.use(express.static(path.resolve(__dirname, "client", "build")));
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// app.get("/", (req, res) => {
//     app.use(express.static(path.join(__dirname, "/client/build")));
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
// });

const port = process.env.PORT || 8005;


app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`);
});


DefaultData();
