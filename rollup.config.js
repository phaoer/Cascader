import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "index.js",
			format: "esm",
		},
		{
			file: "dist/index.js",
			format: "umd",
			name: "Cascader",
		},
	],
	plugins: [typescript(), terser()],
	watch: {
		include: "src/**/*.ts",
		chokidar: true,
		clearScreen: false,
	},
};
