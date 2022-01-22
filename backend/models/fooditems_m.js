const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// // should add image here maybe ---- [1]
const FoodSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    VendorName: {
        type: String,
        required: true
    },
	Price : {
		type: Number,
		$gt: [0, 'invalid price'],
		required: true
	},
	rating: {
		type: Number,
		$gte: [0, 'invalid rating'],
		$lte: [5, 'invalid rating'],
		default: true
	},
	FoodType: {
		enum: ['Veg', 'Non-Veg']
	}, 
	AddOns: [{
	 	item: String,
		price: Number,
		$gt: [0, 'invalid price']		
 	}],
	tags: [{ 
		type: String
	}]
});

module.exports = Food = mongoose.model("Food", FoodSchema);