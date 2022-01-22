var express = require("express");
var router = express.Router();

// Load Vendor model
const Vendor = require("../models/vendor_m");

// GET request 
// Getting the buyer by his email
router.get("/profile", function(req, res) {
    var email = req.body.email;

    Buyer.findOne({ email }).then(vendors => {
		// Check if vendors email exists
		if (!vendors) {
			return res.status(404).json({
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

// edit buyer details 
router.patch("/edit", function(req, res) {
    var email = req.body.email;

    Buyer.findOne({ email }).then(vendors => {
		if (!vendors) {
			return res.status(404).json({
				error: "Vendor is not in the db",
			});
        }
        else{
            res.status(200).json(vendors);
        }
	}) 
    .catch(err => {
        console.log(err);
        res.status(400).send(err);
    });
});

// POST request 
// Add a vendor to db
router.post("/register", (req, res) => {
    const newVendor = new Vendor({
        ManagerName: req.body.ManagerName,
        ShopName: req.body.ShopName,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        OpeningTime: req.body.OpeningTime,
        ClosingTime: req.body.ClosingTime
    });

    newVendor.save()
        .then(vendors => {
            res.status(200).json(vendors);
        })
        .catch(err => {
            console.log(err);
            res.status(400).send(err);
        });
});

module.exports = router;
