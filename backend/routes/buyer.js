var express = require("express");
var router = express.Router();

// Load Buyer model
const Buyer = require("../models/buyer_m");

// GET request 
// Getting the buyer by his email
router.get("/profile", function(req, res) {
    var email = req.body.email;

    Buyer.findOne({ email }).then(buyers => {
		// Check if buyers email exists
		if (!buyers) {
			return res.status(404).json({
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

// edit buyer details 
router.post("/edit", function(req, res) {
    const { name, email, ContactNo, age, BatchName } = req.body;

    Buyer.findOne({ email }).then(buyers => {
		if (!buyers) {
            res.send("Buyer does not exist");
        }
        else if( typeof name !== "undefined" )
        {
            buyers.name = name;
        }
        else if( typeof email !== "undefined" )
        {
            buyers.email !== email;
        }
        else if( typeof ContactNo !== "undefined" )
        {
            buyers.ContactNo = ContactNo;
        }
        else if( typeof age !== "undefined" )
        {
            buyers.age = age;
        }
        else if( typeof BatchName !== "undefined" )
        {
            buyers.BatchName = BatchName;
        }
        else
        {
            res.status(200).json(buyers);
        }
	}) 
    Buyer.save(function (err) {
        if(err)
          console.log('db error', err)
           // saved!
    });
});

// POST request 
// Add a buyer to db
router.post("/register", (req, res) => {
    const newBuyer = new Buyer({
        name: req.body.name,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        Age: req.body.Age,
        BatchName: req.body.BatchName
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
