var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users_m");
const Vendor = require("../models/vendor_m");
const Buyer = require("../models/buyer_m");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
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
router.post("/register", (req, res) => {
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

// // POST request 
// // Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
// 	User.findOne({ email }).then(user => {
// 		// Check if user email exists
// 		if (!user) {
// 			return res.status(404).json({
// 				error: "Email not found",
// 			});
//         }
//         else{
//             res.send("Email Found");
//             return user;
//         }
// 	});
// });

// POST request 
// Login
router.post("/", (req, res) => {
	const email = req.body.email;
	// Find user by email
	Buyer.findOne({ email }).then(buyers => {
		// Check if buyers email exists
		if (!buyers) {
        }
        else{
            res.send("Welcome " + res.body.name );
            return buyers;
        }
	});

    Vendor.findOne({ email }).then(vendors => {
        if( !vendors) {
            res.status(400).send("Email does not exist");
        }
        else{
            res.send("Welcome Back " + res.body.name );
            return vendors;
        }
    });
});


module.exports = router;
