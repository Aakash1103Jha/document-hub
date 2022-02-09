const router = require("express").Router()
const { getAllDocuments } = require("../controllers/Document.controller")

router.post("/", getAllDocuments)

module.exports = router
