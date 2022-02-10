const router = require("express").Router()
const { getAllDocuments, getDocsByTopic } = require("../controllers/Document.controller")

// router.get("/", getAllDocuments)
router.get("/search?", getDocsByTopic)

module.exports = router
