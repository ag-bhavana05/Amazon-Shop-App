const Products = require("./models/productsSchema");
const productsdata = require("./constant/productsData");
const { default: mongoose } = require("mongoose");


const DefaultData = async()=>{
    try {
        await Products.deleteMany({});

        const storeData = await Products.insertMany(productsdata);
    } catch (error) {
        console.log("error : "+ error.message);
    }
}

module.exports = DefaultData;