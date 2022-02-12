const Document = require("../models/Document")
const data = require("../helpers/dummyDocs.json")
const { json } = require("express/lib/response")

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
	try {
		const count = await Document.find({ topic }).count()
		if (count === 0) return res.status(200).json("No documents for this topic")
		const data = await Document.find({ topic })
		return res.status(200).json(data)
	} catch (err) {
		return res.status(500).json("Something went wrong while getting document list.")
	}
}
const getOneDocById = async (req, res) => {
	if (!req.query._id) return res.status(500).json("No document ID found")
	const { _id } = req.query
	try {
		const doc = await Document.findById({ _id })
		if (!doc) return res.status(404).json("Document does not exist, or has been deleted")
		return res.status(200).json(doc)
	} catch (err) {
		return res.status(500).json("Something went wrong")
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

module.exports = { getAllDocuments, getDocsByTopic, onUploadDoc, getOneDocById }
