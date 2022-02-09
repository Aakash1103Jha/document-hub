const { validatePassword } = require("../helpers/validation")

test("returns false for no password", () => {
	expect(validatePassword()).toBe(false)
})
test("returns false for empty password", () => {
	expect(validatePassword("")).toBe(false)
})
test("returns false for password containing no uppercase letter", () => {
	expect(validatePassword("aakash")).toBe(false)
})
test("returns true for password containing at least one uppercase letter", () => {
	expect(validatePassword("Aakashjha")).toBe(true)
})
test("returns true for password containing at least one uppercase letter and at least one number", () => {
	expect(validatePassword("Aakashjha1111")).toBe(true)
})
