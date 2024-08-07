const express = require("express");
const router = express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate");  // middleware function

// get productsdata api
router.get("/getproducts", async (req, res) => {
    try {
        const productsdata = await Products.find();
        // console.log(productsdata);
        res.status(201).json(productsdata);
    } catch (error) {
        console.log("error : " + error.message);
    }
});


// get individual data
router.get("/getproductsone/:id", async (req, res) => {
    try {
        const { id } = req.params;     // or const id = req.params.id;
        // console.log(id);

        const individualdata = await Products.findOne({ id: id });
        // console.log(individualdata);

        res.status(201).json(individualdata);
    } catch (error) {
        res.status(400).json(individualdata);
        console.log("error : " + error.message);
    }
});


// register data
router.post("/register", async (req, res) => {
    // console.log(req.body);

    const { fname, email, mobile, password, cpassword } = req.body;

    if (!fname || !email || !mobile || !password || !cpassword) {
        res.status(422).json({ error: "Fill all the details" });
        console.log("No data available");
    }

    try {
        const preuser = await USER.findOne({ email: email });
        if (preuser) {
            res.status(422).json({ error: "This user is already present" })
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Password and cpassword does not match" })
        } else {
            const finalUser = new USER({ fname, email, mobile, password, cpassword });

            // bcrypt ----> password hashing process
            const storedata = await finalUser.save();
            console.log(storedata);

            res.status(201).json(storedata);
        }
    } catch (error) {

    }
});


// login user api
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Fill all the details" })
    }

    try {
        const userlogin = await USER.findOne({ email: email });
        //console.log(userlogin);

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            // console.log(isMatch);

            if (!isMatch) {
                res.status(400).json({ error: "Wrong password" })
            }
            else {
                // token generate
                const token = await userlogin.generateAuthtoken();
                //console.log(token);

                res.cookie("Amazonweb", token, {
                    expires: new Date(Date.now() + 900000),  // cookie expires after 900000 ms i.e. 15 minutes
                    httpOnly: true
                })
                res.status(201).json(userlogin)
            }
        } else {
            res.status(400).json({ error: "Invalid details" })
        }
    } catch (error) {
        res.status(400).json({ error: "Invalid details" })
    }
})


// adding the data into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Products.findOne({ id: id });
        console.log(cart);

        const UserContact = await USER.findOne({ _id: req.userID });
        console.log(UserContact);

        if (UserContact) {
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
        }
        else {
            res.status(401).json({ error: "Invalid User" });
        }

    } catch (error) {
        res.status(401).json({ error: "Invalid User" });
    }
})

module.exports = router;


// get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
    try {
        const buyuser = await USER.findOne({ _id: req.userID });
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error" + error);
    }
})


//get valid user
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validuserone = await USER.findOne({ _id: req.userID });
        res.status(201).json(validuserone);
    } catch (error) {
        console.log("error" + error);
    }
})


// remove item from cart
router.delete("/remove/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curval) => {
            return curval.id != id;
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);
        console.log("item removed");

    } catch (error) {
        console.log("error" + error);
        res.status(400).json(req.rootUser);
    }
})


// for user logout
router.get("/logout", authenticate, (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("Amazonweb", { path: "/" });

        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");
    } catch (error) {
        console.log("error for user logout");
    }
})