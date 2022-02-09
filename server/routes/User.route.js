const router = require("express").Router()
const { onLogin, onRegister, onGetProfile } = require("../controllers/User.controller")
const { validateToken } = require("../helpers/validation")

router.post("/login", onLogin)
router.post("/register", onRegister)
router.get("/profile", validateToken, onGetProfile)

module.exports = router
