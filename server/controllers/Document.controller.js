const Document = require("../models/Document")
const data = require("../helpers/dummyDocs.json")

const getAllDocuments = async (req, res) => {
	try {
		// const allDocs = await Document.find()
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json("Something went wrong while getting document list.")
	}
}

module.exports = { getAllDocuments }
