const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: 'This is a required field',
        // validate: [validateMail, 'Please provide a valid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
	},
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model("Users", UserSchema);

const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: 'This email is already registered',
		required: 'This is a required field',
        // validate: [validateMail, 'Please provide a valid email'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
	}, 
	ContactNo : {
		type: Number,
		required: true
	},
	Age : {
		type: Number,
		required: false,
		$lt : [110, 'invalid age'],
		$gt : [3, 'invalid age']
	}, 
	BatchName: {
		type: String,
		match: ['UG[1-5]', 'Invalid Batch Name']
	}
});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);

const VendorSchema = new Schema({
	ManagerName: {
		type: String,
		required: true
	},
	ShopName: {
		type: String,
		required: true,
		unique: 'This Shop Name is already registered'
	},
	email: {
		type: String,
		unique: 'This email is already registered',
		required: 'This is a required field',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
	}, 
	ContactNo : {
		type: Number,
		required: true
	},
	OpeningTime : {
		type: Date,
		required: 'opening time is required'
	},
	ClosingTime : {
		type: Date,
		required: 'closing time is required'
	}
});

module.exports = Vendor = mongoose.model("Vendor", VendorSchema);

// should add image here maybe ---- [1]
const FoodSchema = new Schema({
	name: {
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

const WalletSchema = new Schema({
	Balance: { 
		type: Number,
		$gte: [0, 'invalid balance'],
		required: true
	}
});

module.exports = Wallet = mongoose.model("Wallet", WalletSchema);

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