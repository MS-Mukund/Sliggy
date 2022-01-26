var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users_m");
const Vendor = require("../models/vendor_m");
const Buyer = require("../models/buyer_m");

// GET request 
// Getting all the users
router.get("/vendor", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// POST request 
// Add a user to db
router.post("/vendor/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date
    });

    newUser.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

module.exports = router;
