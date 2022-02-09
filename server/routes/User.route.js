const router = require("express").Router()
const { onLogin } = require("../controllers/User.controller")

router.post("/login", onLogin)

module.exports = router
