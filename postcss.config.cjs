module.exports = {
	plugins: [
		require("postcss-preset-env")({
			browsers: ["> 0.5%", "last 2 versions", "IE 11"],
			stage: 3,
		}),
		require("cssnano")({ preset: "default" }),
	],
};