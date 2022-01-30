const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BuyerSchema = new Schema({
	name: {
		type: String,
		required: 'Your good name please?'
	},
	email: {
		type: String,
		unique: 'This email is already registered',
		required: 'We wanna know your email',
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
	Age : {
		type: Number,
		required: false,
		$lt : [110, 'invalid age'],
		$gt : [3, 'invalid age']
	}, 
	BatchName: {
		type: String,
		match: [/UG[12345]/, 'Invalid Batch Name']
	}, 
	Favorites: [{ type: Schema.Types.ObjectId, ref: 'Food' }], 
	Wallet: {
		type: Number,
		required: false,
		$gte: ['0', 'invalid balance' ]
	}
});

module.exports = Buyer = mongoose.model("Buyer", BuyerSchema);