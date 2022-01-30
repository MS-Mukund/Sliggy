var express = require("express");
var router = express.Router();

const Order = require("../models/orders_m");

// create order
router.post("/create", (req, res) => {
    const newOrder = new Order({
        Fid: req.body.Fid,
        Bid: req.body.Bid,
        VendorEmail: req.body.VendorEmail,

        PlacedTime: req.body.PlacedTime,
        Fname: req.body.Fname,
        Cost: parseInt(req.body.Cost),
        Quantity: parseInt(req.body.Quantity),

        Status: 'Placed',
        Rating: 0
    });
    
    newOrder.save()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            console.log(err);
            res.status(401).send(err);
        });
});

module.exports = router;