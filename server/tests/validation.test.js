const { validatePassword } = require("../helpers/validation")

test("returns false for no password", () => {
	expect(validatePassword()).toBe(false)
})
test("returns false for empty password", () => {
	expect(validatePassword("")).toBe(false)
})
test("returns false for password < 8 characters", () => {
	expect(validatePassword("aaA112@")).toBe(false)
})
test("returns false for password containing no uppercase letter", () => {
	expect(validatePassword("aakash1103@")).toBe(false)
})
test("returns false for password not containing at least 1 number", () => {
	expect(validatePassword("Aakashjha@")).toBe(false)
})
test("returns false for password not containing at least 1 special character", () => {
	expect(validatePassword("Aakashjha@")).toBe(false)
})
test("returns true for password containing at least 1 uppercase letter, number, and special character", () => {
	expect(validatePassword("Aakashjha@1103")).toBe(true)
})
