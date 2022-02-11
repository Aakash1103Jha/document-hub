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
	const topic = req.query.topic?.toLowerCase()
	console.log(req.query.topic, topic)
	try {
		// const filteredData = data.filter((item) => {
		// 	return item.topic.toLowerCase() === topic.toLowerCase()
		// })
		const filteredData = await Document.find({ topic })
		return res.status(200).json(filteredData)
	} catch (err) {
		return res.status(500).json("Something went wrong while getting document list.")
	}
}
const onUploadDoc = async (req, res) => {
	if (!req.file) return res.status(500).json("Looks like the file didn't reach me")
	const { username, _id } = req.user.payload
	const user = { name: username, _userId: _id }
	const newDoc = new Document({
		...req.body,
		topic: req.body.topic.toLowerCase(),
		fileName: req.file.originalname,
		uploadedBy: {
			...user,
		},
	})
	try {
		await newDoc.save()
		return res.status(200).json({ message: "Document uploaded successfully!", id: newDoc._id })
	} catch (err) {
		return res.status(500).json("Something went wrong while uploading document.")
	}
}

module.exports = { getAllDocuments, getDocsByTopic, onUploadDoc }
