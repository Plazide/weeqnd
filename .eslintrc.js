module.exports = {
	globals: {
		__PATH_PREFIX__: true
	},
	extends: [
		"plazide",
		"plugin:react/recommended"
	],
	env: {
		browser: true,
		node: true
	}
}