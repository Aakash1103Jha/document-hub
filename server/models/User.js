const { Schema, model } = require("mongoose")

const User = Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamp: true },
)

module.exports = model("users", User)
