# cascaderjs

cascader for javascript

## Introduction

> Extremely lightweight, incredibly simple.

## Browser Support

| ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
| --- | --- | --- | --- | --- | --- |
| Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |

## Installing

### Package manager

```bash
npm install cascaderjs
```

```javascript
import Cascader from "cascaderjs";
import "cascaderjs/styles/index.css";
```

### Browser

```javascript
<link rel="stylesheet" href="styles/index.css" />
<script type="text/javascript" src="dist/index.js"></script>
```

## Usage

```typescript
const cascader: CascaderInstance = new Cascader(selector, options);
```

> The value of selector cannot be 'body' or 'document'

```typescript
import Cascader, { CascaderInstance } from "cascaderjs";
import "cascaderjs/styles/index.css";

const cascader: CascaderInstance = new Cascader(".cascader1", {
	mode: "single", //multiple
	placeholder: "please select",
	data: [
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
	onChange: function (value, labelValue, indexValue) {
		//The callback after selection will only trigger if the user genuinely clicks.
		console.log(value, labelValue, indexValue);
	},
	displayRender: function (label) {
		//The function to display selected items after selection, customizable by the user. default is label.join("/")
		return label.join("~");
	},
});

//initial
cascader.init();

//setValue
cascader.setValue(["zhejiang", "hangzhou", "xihu"]);

//getter
cascader.value; // labelValue indexValue
```

## Preview 
![preview-0](https://raw.githubusercontent.com/phaoer/Cascader/main/images/preview-0.png)
![preview-1](https://raw.githubusercontent.com/phaoer/Cascader/main/images/preview-1.png)
![preview-2](https://raw.githubusercontent.com/phaoer/Cascader/main/images/preview-2.png)
![preview-3](https://raw.githubusercontent.com/phaoer/Cascader/main/images/preview-3.png)

## Customize

> use css variable to customize cascader styles

```css
// default
--cascader-primary-color: rgb(64, 150, 255);
--cascader-background-color: #fff;

--cascader-container-width: 300px;
--cascader-container-height: 32px;
--cascader-container-padding: 2px 5px;
--cascader-container-border-width: 1px;
--cascader-container-border-style: solid;
--cascader-container-border-color: rgb(217, 217, 217);
--cascader-container-border-radius: 6px;

--cascader-container-value-color: rgba(0, 0, 0, 0.88);
--cascader-container-value-font-size: 14px;

--cascader-container-arrow-color: #000;
--cascader-container-arrow-active-color: #000;

--cascader-container-menus-top: 110%;
--cascader-container-menus-border-radius: 6px;
--cascader-container-menus-box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);

--cascader-container-menu-max-height: 215px;
--cascader-container-menu-padding: 5px;
--cascader-container-menu-border-color: rgba(0, 0, 0, 0.06);

--cascader-container-item-padding: 5px 10px;
--cascader-container-item-border-radius: 6px;
--cascader-container-item-background-color: #fff;
--cascader-container-item-background-hover-color: rgba(0, 0, 0, 0.06);
--cascader-container-item-background-active-color: rgb(230, 244, 255);
--cascader-container-item-disabled-color: rgba(0, 0, 0, 0.25);

--cascader-container-item-multiple-width: 20px;
--cascader-container-item-multiple-height: 20px;
--cascader-container-item-multiple-border-color: rgb(217, 217, 217);
--cascader-container-item-multiple-border-radius: 6px;
--cascader-container-item-multiple-active-color: #1677ff;

--cascader-container-item-value-max-width: 150px;
--cascader-container-item-value-font-size: 14px;
--cascader-container-item-value-color: rgba(0, 0, 0, 0.88);

--cascader-container-item-icon-font-size: 14px;
--cascader-container-item-icon-color: rgba(0, 0, 0, 0.45);
```
