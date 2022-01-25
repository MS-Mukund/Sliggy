var express = require("express");
var router = express.Router();

// Load User model
const Buyer  = require("../models/buyer_m");
const Vendor = require("../models/vendor_m");

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Buyer.findOne({ email }).then(buyers => {
		// Check if buyers email exists
		if (!buyers) {
        }
        else {
            if( req.body.password === buyers.password ){
                res.status(200).send([1]);
                return buyers;
            }
            else
            {
                res.status(400).send("Incorrect Buyer password");
                return null;
            }
        }
	});

    Vendor.findOne({ email }).then(vendors => {
        if( !vendors) {
            res.status(402).send("Email does not exist");
        }
        else{
            if( req.body.password === vendors.password ){
                res.status(200).send([0]);
                return vendors;
            }
            else
            {
                res.status(400).send("Incorrect Vendor password");
                return null;
            }
        }
    });
});

module.exports = router;