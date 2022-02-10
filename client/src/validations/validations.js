export const validateEmail = (email) => {}

export const validatePassword = (password) => {
	if (!password || password.length <= 0) return false
	if (
		password.match(
			/^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*["!'^+%&/()=?_\-*\\{}[\]$#£é€@])(?=.{8,}))/gm,
		)
	)
		return true
	return false
}
