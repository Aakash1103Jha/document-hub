const router = require("express").Router()
const {
	onLogin,
	onRegister,
	onGetProfile,
	onResetPassword,
	onActivateAccount,
} = require("../controllers/User.controller")
const { validateToken, validateActivationToken } = require("../helpers/validation")

router.post("/login", onLogin)
router.post("/register", onRegister)
router.get("/profile", validateToken, onGetProfile)
router.post("/reset-password", onResetPassword)
router.post("/activate?", validateActivationToken, onActivateAccount)

module.exports = router
