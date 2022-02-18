const { model, Schema } = require("mongoose")

const Profile = Schema({
	_id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: false,
		default: "User",
	},
	lastName: {
		type: String,
		required: false,
		default: "",
	},
	interests: {
		type: String,
		required: false,
		default: "",
	},
})

module.exports = model("profiles", Profile)
