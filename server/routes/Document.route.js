const router = require("express").Router()
const {
	getAllDocuments,
	onUploadDoc,
	getDocsByTopic,
	getOneDocById,
} = require("../controllers/Document.controller")
const { uploadHandler } = require("../helpers/multer.config")
const { validateToken } = require("../helpers/validation")

// router.get("/", getAllDocuments)
router.get("/search?", getDocsByTopic)
router.post("/upload", validateToken, uploadHandler.single("file"), onUploadDoc)
router.get("/view?", getOneDocById)

module.exports = router
