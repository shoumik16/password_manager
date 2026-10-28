const mongoose = require('mongoose');

const myPasswordsSchema = new mongoose.Schema({
	website: { type: String, required: true },
	name: { type: String, required: true },
	password: { type: String, required: true },
});

module.exports = mongoose.model('MyPasswords', myPasswordsSchema);
