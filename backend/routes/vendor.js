var express = require("express");
var router = express.Router();

// Load Vendor model
const Vendor = require("../models/vendor_m");
const Buyer = require("../models/buyer_m");

// GET request 
// Getting the buyer by his email
router.get("/vprofile", function(req, res) {
    var email = req.body.email;

    Vendor.findOne({ email }).then(vendors => {
		// Check if vendors email exists
		if (!vendors) {
			res.status(404).json({
				error: "Vendor is not in the db",
			});
        }
        else{
            res.json(vendors);
        }
	})
    .catch(err => {
        console.log(err);
        res.status(400).send(err);
    });
});

// edit vendor details 
router.put("/editvpr", function(req, res) {
    var email = req.body.email;

    Vendor.findOne({ email }).then(vendors => {
        if (!vendors) {
            res.send("Vendor does not exist");
        }
        else{
            // edit vendors details
            
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).send(err);
    })
});

// POST request 
// Add a vendor to db
router.post("/vregister", (req, res) => {
    const newVendor = new Vendor({
        ManagerName: req.body.ManagerName,
        ShopName: req.body.ShopName,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        password: req.body.password,
        OpeningTime: req.body.OpeningTime,
        ClosingTime: req.body.ClosingTime
    });
    
    if( newVendor.ManagerName === "" || newVendor.ShopName === "" || newVendor.email === "" || newVendor.ContactNo === "" || newVendor.OpeningTime === "" || newVendor.ClosingTime === "" )
    {
        res.status(401).send("Please fill all the fields");
    }

    Buyer.findOne({ email: newVendor.email }).then(buyers => {
        if (buyers) {
            res.status(402).send("Email already exists");
        }
    });


    newVendor.save()
        .then(vendors => {
            res.status(200).json(vendors);
        })
        .catch(err => {
            console.log(err);
            res.status(403).send(err);
        });
});

module.exports = router;
