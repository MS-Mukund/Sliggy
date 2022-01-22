const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
	Balance: { 
		type: Number,
		$gte: [0, 'invalid balance'],
		required: true
	}
});

module.exports = Wallet = mongoose.model("Wallet", WalletSchema);