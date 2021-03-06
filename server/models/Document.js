const { Schema, model } = require("mongoose")

const Document = Schema(
	{
		topic: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		uploadedBy: {
			name: { type: String, required: true },
			_userId: { type: String, require: true },
		},
		fileName: {
			type: String,
			required: true,
		},
	},
	{ timestamp: true },
)

module.exports = model("documents", Document)
