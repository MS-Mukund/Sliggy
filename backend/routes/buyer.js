var express = require("express");
var router = express.Router();

// Load Buyer model
const Buyer = require("../models/buyer_m");
const Vendor = require("../models/vendor_m");

// GET request 
// Getting the buyer by his email
router.get("/bprofile/:email", function(req, res) {
    const { email } = req.params;

    Buyer.findOne({ email }).then(buyers => {
		// Check if buyers email exists
		if (!buyers) {
			res.status(404).json({
				error: "Buyer does not exist",
			});
        }
        else{
            res.json(buyers);
        }
	})
    .catch(err => {
        console.log(err);
        res.status(400).send(err);
    });
});

// edit vendor details 
router.put("/editbpr", function(req, res) {
    const email = req.body.email;
    const filter = { email: email };
    const update = {
        name: req.body.name,
        email: req.body.email,
        ContactNo: req.body.ContactNo,

        password: req.body.password,
        Age: req.body.Age,
        BatchName: req.body.BatchName,
    };

    Buyer.findOneAndUpdate(filter, update, { new: true }).then( vendors => {
        res.json(vendors);
    })
    .catch(err => {
        console.log(err);
        res.status(403).send(err);
    })
});

// delete food item by id
router.delete("/delete/:email", function(req, res) {
    const { email } = req.params;

    Buyer.deleteOne({ email: email }).then(buyers => {
        res.json(buyers);
    })
    .catch(err => {
        console.log(err);
        res.status(502).send(err);
    });
});

// POST request 
// Add a buyer to db
router.post("/bregister", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        password: req.body.password,
        Age: req.body.Age,
        BatchName: req.body.BatchName,
        Favorites: [], 
        wallet: 0
    });

    Vendor.findOne({ email: req.body.email }).then(vendors => {
        if (vendors) {
            res.status(400).send("Email already exists");
        }
    });    

    newBuyer.save()
        .then(buyers => {
            res.status(200).json(buyers);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

module.exports = router;
