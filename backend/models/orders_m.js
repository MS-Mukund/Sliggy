const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	Vendorname: {
		type: String,
		required: true
	},
	Username: {
		type: String,
		required: true
	},
	FoodItem: {
		type: String,
		required: true
	}, 
	PlacedTime: {
		type: Date,
		default: Date.now
	}, 
	Cost: {
		type: Number,
		$gt: [0, 'invalid cost'],
		required: true
	},
	Quantity: {
		type: Number,
		$gt: [0, 'invalid quantity'],
		required: true
	},
	Status: {
		enum: ['Placed', 'Accepted', 'cooking', 'ready for pickup', 'completed', 'rejected']
	}, 
	Rating: {
		type: Number,
		$gte: [0, 'invalid rating'],
		$lte: [5, 'invalid rating'],
		default: '3'
	}
});

module.exports = Order = mongoose.model("Order", OrderSchema);
