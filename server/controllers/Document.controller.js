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
const getDocsByTopic = async (req, res) => {
	if (!req.query.topic) return res.status(404).json("No keyword found for search")
	const topic = req.query.topic
	try {
		const filteredData = data.filter((item) => {
			return item.topic.toLowerCase() === topic.toLowerCase()
		})
		// const allDocs = await Document.find()
		return res.status(200).json(filteredData)
	} catch (err) {
		return res.status(500).json("Something went wrong while getting document list.")
	}
}

module.exports = { getAllDocuments, getDocsByTopic }
