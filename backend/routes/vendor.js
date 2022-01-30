var express = require("express");
var router = express.Router();

// Load Vendor model
const Vendor = require("../models/vendor_m");
const Buyer = require("../models/buyer_m");

// GET request 
// Getting the buyer by his email
router.get("/vprofile/:email", function(req, res) {
    const { email } = req.params;

    Vendor.findOne({ email }).then(vendors => {
		// Check if vendors email exists
		if (!vendors) {
			res.status(405).json({
				message: req.body,
			});
        }
        else{
            res.json(vendors);
        }
	})
    .catch(err => {
        console.log(err);
        res.send(err);
    });
});

// edit vendor details 
router.put("/editvpr", function(req, res) {
    const email = req.body.email;
    const filter = { email: email };
    const update = {
        ManagerName: req.body.ManagerName,
        ShopName: req.body.ShopName,
        email: req.body.email,
        ContactNo: req.body.ContactNo,
        wallet: req.body.wallet,
        password: req.body.password,
        OpeningTime: req.body.OpeningTime,
        ClosingTime: req.body.ClosingTime,
    };

    Vendor.findOneAndUpdate(filter, update, { new: true }).then( vendors => {
        res.json(vendors);
    })
    .catch(err => {
        console.log(err);
        res.status(403).send(err);
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
            res.status(405).send("Email already exists");
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

// delete food item by id
router.delete("/delete/:email", function(req, res) {
    const { email } = req.params;

    Vendor.deleteOne({ email: email }).then(vendors => {
        res.json(vendors);
    })
    .catch(err => {
        console.log(err);
        res.status(502).send(err);
    });
});

module.exports = router;
