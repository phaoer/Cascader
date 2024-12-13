# cascaderjs

cascader for javascript

## Introduction

> Extremely lightweight, incredibly simple.

## Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Latest ✔                                                                                          | Latest ✔                                                                                             | Latest ✔                                                                                          | Latest ✔                                                                                       | Latest ✔                                                                                    | 11 ✔                                                                                                                                    |

## Installing

### Package manager

```bash
  npm install cascaderjs
```

### Browser

```javascript
<script type="text/javascript" src="dist/index.js"></script>
```

## Usage

```javascript
new Cascader(selector, options);
```

> The value of selector cannot be 'body' or 'document'

## Example

```javascript
import Cascader from "cascaderjs"; // or const Cascader = require("cascaderjs");

var cascader = new Cascader(".cascader1", {
	width: 300, //default is value 227
	height: 40,
	itemHeight: 35,
	mode: "multiple", //default value is single
	placeholder: "please select",
	options: [
		{
			className: "sichuan", //If the value is not empty, it will be set to class
			value: "sichuan",
			label: "Sichuan",
			showTitle: true, //html title attribute
			children: [
				{
					value: "chengdu",
					label: "Chengdu",
					children: [
						{
							value: "wuhouci",
							label: "Wuhou Shrine",
						},
						{
							value: "jinli",
							label: "Jinli Street",
						},
					],
				},
				{
					value: "mianyang",
					label: "Mianyang",
				},
				{
					value: "zigong",
					label: "Zigong",
				},
			],
		},
		{
			value: "zhejiang",
			label: "Zhejiang",
			children: [
				{
					value: "hangzhou",
					label: "Hangzhou",
					children: [
						{
							value: "xihu",
							label: "West Lake",
						},
					],
				},
			],
		},
		{
			value: "jiangsu",
			label: "Jiangsu",
			disabled: true, //default value is false
			children: [
				{
					value: "nanjing",
					label: "Nanjing",
				},
			],
		},
		{
			value: "hongkong",
			label: "Hongkong",
		},
	],
	showClear: true, //display clear button. default value is false
	defaultValue: ["sichuan", "chengdu", "jinli"], //If the mode is multiple, a binary array must be used, for example: [['sichuan', 'chengdu', 'jinli']].
	onChange: function (value, labelValue) {
		//The callback after selection will only trigger if the user genuinely clicks.
		console.log(value, labelValue);
	},
	displayRender: function (label) {
		//The function to display selected items after selection, customizable by the user. default is label.join("/")
		return label.join("~");
	},
});

cascader.init(); //reset() setValue(Array);
```
