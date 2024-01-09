import { nodeResolve } from "@rollup/plugin-node-resolve";
import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

export default {
	input: "src/index.js",
	output: [
		{
			file: "dist/cjs/index.cjs",
			format: "cjs",
		},
		{
			file: "dist/esm/index.js",
			format: "esm",
		},
		{
			file: "dist/index.js",
			format: "umd",
			name: "Cascader",
		},
	],
	plugins: [
		nodeResolve({ mainFields: ["browser", "module", "main"] }),
		commonjs(),
		json(),
		babel({
			exclude: "node_modules/**",
			babelHelpers: "bundled",
		}),
		terser(),
	],
	watch: {
		include: "src/**",
		chokidar: true,
		clearScreen: false,
	},
};
