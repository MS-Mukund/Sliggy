var express = require("express");
var router = express.Router();

// Load User model
const Buyer  = require("../models/buyer_m");
const Vendor = require("../models/vendor_m");

// Login
router.post("/vlogin", (req, res) => {
	const email = req.body.email;
    const password = req.body.password;
	// Find user by email
	Vendor.findOne({ email, password }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.json({
				status: "Vendor not found",
			});
        }
        else{
            //res.data.user = user;
            res.send({message: "Vendor Found", user: user});
            return user;
        }
	});
});

// Login
router.post("/blogin", (req, res) => {
	const email = req.body.email;
    const password = req.body.password;

    const errorBuyer = new Buyer({
        email:"not found",
    })
	// Find user by email
	Buyer.findOne({ email, password }).then(buyers => {
		// Check if buyers email exists
		if (!buyers) {
            return res.json({
				status: "Buyer not found",
			});
        }
        else{           
            
            res.send({message:"Buyer Found",buyers:buyers,status:"success"});
            return buyers;
        }
	});
});

// // POST request 
// // Login
// router.post("/login", (req, res) => {
// 	const email = req.body.email;
// 	// Find user by email
//     var flag = 0;
    
//     Buyer.findOne({ email }).then(buyers => {
//         if( !buyers) {
//         }
//         else{
//             if( req.body.password === buyers.password ){
//                 flag = 1;
//                 res.status(200).send([1, buyers.email]);
//                 return;
//             }
//             else
//             {
//                 flag = 1;
//                 res.status(400).send("Incorrect Vendor password");
//                 return;
//             }
//         }
//     })
//     .catch(err => {
//         flag = 1;
//         console.log(err);
//         res.status(402).send(err);
//     });

//     if( flag === 0 )
//     {
//         Vendor.findOne({ email }).then(vendors => {
//             if( !vendors) {
//                 res.status(401).send("Email does not exist");
//             }
//             else{
//                 if( req.body.password === vendors.password ){
//                     res.status(200).send([0, vendors.email]);
//                     return;
//                 }
//                 else
//                 {
//                     res.status(400).send("Incorrect Vendor password");
//                     return;
//                 }
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(403).send(err);
//         });
//     }
// });

module.exports = router;