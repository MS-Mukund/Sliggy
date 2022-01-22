const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
		validate: {
			validator: function(v) {
			  return /\d{10}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		  },
		required: 'Enter a 10-digit contact number'
	},
	password: {
		type: String,
		required: 'Password cannot be null'
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