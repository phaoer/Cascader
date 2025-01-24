if (!Array.prototype.find) {
	Array.prototype.find = function (callback: any, thisArg: any) {
		if (this == null) {
			throw new TypeError("Array.prototype.find called on null or undefined");
		}
		if (typeof callback !== "function") {
			throw new TypeError(callback + " is not a function");
		}

		const O = Object(this);
		const len = O.length >>> 0;
		let T;
		if (arguments.length > 1) {
			T = thisArg;
		}

		for (let i = 0; i < len; i++) {
			if (i in O) {
				const value = O[i];
				if (callback.call(T, value, i, O)) {
					return value;
				}
			}
		}
		return undefined;
	};
}

if (!Array.prototype.findIndex) {
	Array.prototype.findIndex = function (callback, thisArg) {
		if (this == null) {
			throw new TypeError("Array.prototype.findIndex called on null or undefined");
		}
		if (typeof callback !== "function") {
			throw new TypeError(callback + " is not a function");
		}

		const O = Object(this);
		const len = O.length >>> 0;
		let T;
		if (arguments.length > 1) {
			T = thisArg;
		}

		for (let i = 0; i < len; i++) {
			if (i in O) {
				const value = O[i];
				if (callback.call(T, value, i, O)) {
					return i;
				}
			}
		}
		return -1;
	};
}

if (!Element.prototype.matches) Element.prototype.matches = (Element.prototype as any).msMatchesSelector || (Element.prototype as any).webkitMatchesSelector;

if (!Element.prototype.closest)
	Element.prototype.closest = function (s: any) {
		var el: Element | null = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement;
		} while (el !== null);
		return null;
	};

export type CascaderOptionsData = {
	className?: string;
	showTitle?: boolean;
	disabled?: boolean;
	children?: CascaderOptionsData[];
	label: string;
	value: string;
};

export type CascaderOptions = {
	placeholder?: string;
	showClear?: boolean;
	mode?: "single" | "multiple";
	data: CascaderOptionsData[];
	displayRender?: (value: any[]) => string;
	defaultValue?: any[];
	onChange?: (value: any[], labelValue: any[], indexValue: any[]) => void;
};

export default class Cascader {
	private container: string;
	private uuid: string;
	private splitStr: string = "__CASCADER_SPLIT__";
	private options: CascaderOptions;
	private valValue: any[] = [];
	private randomStr(length: number) {
		const characters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;

		let result = "";

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters[randomIndex];
		}

		return result;
	}
	private query(selector: string, useDoc?: boolean): HTMLElement | null | undefined {
		return (useDoc ? document : document.querySelector(`.cascader-container_${this.uuid}`))?.querySelector(selector);
	}
	private queryAll(selector: string, useDoc?: boolean): NodeListOf<Element> | undefined {
		return (useDoc ? document : document.querySelector(`.cascader-container_${this.uuid}`))?.querySelectorAll(selector);
	}
	private getSiblings(element: HTMLElement | null) {
		var siblings = [];
		var sibling = element?.parentNode?.firstChild;

		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== element) {
				siblings.push(sibling);
			}

			sibling = sibling.nextSibling;
		}

		return siblings;
	}
	private menusShow() {
		const { mode = "single" } = this.options;

		if (mode !== "multiple") {
			this.setValue(this.valValue);
		}

		this.query(`.cascader-container_${this.uuid}`, true)?.classList.add("cascader-container_active");
		this.query(".cascader-container_menus")?.classList.add("cascader-container_menus_active");
	}
	private menusHide() {
		this.query(`.cascader-container_${this.uuid}`, true)?.classList.remove("cascader-container_active");
		this.query(".cascader-container_menus")?.classList.remove("cascader-container_menus_active");
	}
	private calculateElementWidth(htmlString: string) {
		const tempContainer = document.createElement("div");
		tempContainer.style.position = "absolute";
		tempContainer.style.top = "-10000px";
		tempContainer.innerHTML = htmlString;

		const element = tempContainer.children?.[0] as HTMLElement;
		element.style.boxSizing = "border-box";
		element.style.fontSize = "14px";

		document.body.appendChild(tempContainer);

		const width = element.offsetWidth;

		document.body.removeChild(tempContainer);

		return width;
	}
	private selectItem(currentItem: HTMLElement) {
		const currentLevel = parseInt(currentItem.dataset.parentLevel ?? "0");

		const siblings = this.getSiblings(currentItem);
		for (let index = 0; index < siblings.length; index++) {
			const element = siblings[index] as HTMLElement;
			element.classList.remove("cascader-container_menus_menu_item_active");
		}
		currentItem.classList.add("cascader-container_menus_menu_item_active");

		const allMenu = this.queryAll(".cascader-container_menus_menu") ?? [];
		for (let index = 0; index < allMenu.length; index++) {
			const element = allMenu[index] as HTMLElement;
			const level = parseInt(element.dataset.level ?? "0");

			if (level > currentLevel) {
				this.query(".cascader-container_menus")?.removeChild(element);
			}
		}
	}
	private renderValue(value: any[] = []) {
		const { displayRender, mode = "single", placeholder = "" } = this.options;

		const fullItemTagValue = [];
		const checkedItemTagValue = [];

		if (mode === "multiple") {
			const allItem = this.queryAll(".cascader-container_menus_menu_item") ?? [];
			for (let index = 0; index < allItem.length; index++) {
				const element = allItem[index];
				element?.classList.remove("cascader-container_menus_menu_item_half");
				element?.classList.remove("cascader-container_menus_menu_item_full");
			}

			for (let index = 0; index < this.valValue.length; index++) {
				const element = this.valValue[index];
				const item = this.query(`.cascader-container_menus_menu_item[data-tag="${element.join(this.splitStr)}"]`);
				item?.classList.add("cascader-container_menus_menu_item_full");

				for (let index = 0; index < element.length - 1; index++) {
					const parentValue = element.slice(0, element.length - 1 - index);

					if (checkedItemTagValue.map((ele) => ele.join(this.splitStr)).indexOf(parentValue.join(this.splitStr)) !== -1) {
						continue;
					}

					const parentChild = this.getNextLevelData(parentValue);

					const recursion = (data: CascaderOptionsData, tag: string[]) => {
						const { value, children } = data ?? {};

						if (children) {
							let fullCount = 0;

							for (let index = 0; index < children.length; index++) {
								if (recursion(children[index], [...tag, value])) {
									fullCount++;
								}
							}

							return fullCount === children.length;
						}

						return this.valValue.findIndex((ele) => ele.join(this.splitStr) === `${tag.join(this.splitStr)}${this.splitStr}${value}`) !== -1;
					};

					const fullCount = parentChild.reduce((acc, cur) => {
						if (recursion(cur, parentValue)) {
							return acc + 1;
						}

						return acc;
					}, 0);

					const parentItem = this.query(`.cascader-container_menus_menu_item[data-tag="${parentValue.join(this.splitStr)}"]`);

					if (fullCount === parentChild.length) {
						parentItem?.classList.add("cascader-container_menus_menu_item_full");
						fullItemTagValue.push(parentValue);
					} else {
						parentItem?.classList.add("cascader-container_menus_menu_item_half");
					}

					checkedItemTagValue.push(parentValue);
				}
			}
		}

		const valueDom = this.query(".cascader-container_value");

		if (valueDom) {
			if (value.length === 0) {
				valueDom.innerHTML = `<span class="cascader-container_value_placeholder">${placeholder}</span>`;

				return;
			}

			const labelValue = this.transformValue("getLabelValue", value);

			const getDisplayStr = (label: any[]) => {
				let displayStr;
				if (typeof displayRender === "function") {
					displayStr = displayRender(label);
				} else {
					displayStr = label.join("/");
				}

				return displayStr;
			};

			if (mode === "multiple") {
				const labelArr: any[] = [];

				for (let index = 0; index < value.length; index++) {
					const element = value[index];
					let label = labelValue[index];

					if (fullItemTagValue.filter((ele) => ele.length === 1).find((ele) => element.join(this.splitStr).indexOf(ele.join("")) !== -1)) {
						label = label.slice(0, 1);
					}

					if (labelArr.map((ele) => ele.join(this.splitStr)).indexOf(label.join("")) !== -1) {
						continue;
					}

					labelArr.push(label);
				}

				let html = ``;
				const containerWidth = this.query(".cascader-container_value")?.offsetWidth ?? 0;
				let itemWidthTotal = 0;

				for (let index = 0; index < labelArr.length; index++) {
					const element = labelArr[index];
					const eleStr = `<div class="cascader-container_value_item">${getDisplayStr(element)}</div>`;
					const itemWidth = this.calculateElementWidth(eleStr);
					const afterItemWidthTotal = itemWidthTotal + itemWidth + 5;

					if (afterItemWidthTotal <= containerWidth) {
						html += eleStr;
						itemWidthTotal = afterItemWidthTotal;
					} else {
						html += `<div class="cascader-container_value_item">...</div>`;
						break;
					}
				}

				valueDom.innerHTML = html;
			} else {
				valueDom.innerHTML = getDisplayStr(labelValue);
			}
		}
	}
	private getNextLevelData(value: string[] = []) {
		const { data = [] } = this.options;

		return value.reduce((acc, cur) => {
			return acc.find((ele) => ele.value === cur)?.children ?? [];
		}, data);
	}
	private transformValue(type: "getValue" | "getLabelValue" | "getIndexValue", value: any[] = []) {
		const { data = [], mode = "single" } = this.options;

		const getValue = (values: any[]) => {
			const result: any = [];

			let treeData: CascaderOptionsData[] = [...data];
			for (let index = 0; index < values.length; index++) {
				const element = values[index];

				if (type === "getValue") {
					result.push(treeData[element]?.value);
					treeData = treeData[element]?.children ?? [];
				} else if (type === "getLabelValue") {
					const target = treeData.find((ele) => ele.value === element);
					result.push(target?.label);
					treeData = target?.children ?? [];
				} else if (type === "getIndexValue") {
					result.push(treeData.findIndex((ele) => ele.value === element));
					treeData = treeData.find((ele) => ele.value === element)?.children ?? [];
				}
			}

			return result;
		};

		if (mode === "multiple") {
			const result: any = [];

			for (let index = 0; index < value.length; index++) {
				const element = value[index];
				result.push(getValue(element));
			}

			return result;
		} else {
			return getValue(value);
		}
	}
	private createMenu(data: CascaderOptionsData[] = [], level: number = 0, tag: string = "") {
		const { mode = "single" } = this.options;

		let html = `<div class="cascader-container_menus_menu" data-level="${level}">`;

		for (let index = 0; index < data.length; index++) {
			const { className, showTitle, disabled, children = [], label, value } = data[index];

			const otherClass = `${className ? ` ${className}` : ""}${disabled ? " cascader-container_menus_menu_item_disabled" : ""}`;

			const tagStr = tag ? `${tag}${this.splitStr}${value}` : value;

			const multipleisDisabled = disabled ? "cascader-container_menus_menu_item_multiple_disabled" : "";

			const isMultiple =
				mode === "multiple"
					? `
                        <div class="cascader-container_menus_menu_item_multiple ${multipleisDisabled}">
                            <div>
                                <span>&radic;</span>
                            </div>
                        </div>
                    `
					: ``;

			html += `
                    <div class="cascader-container_menus_menu_item${otherClass}" data-parent-level="${level}" data-label="${label}" data-value="${value}" data-tag="${tagStr}">
                        ${isMultiple}
                        <div
                            class="cascader-container_menus_menu_item_value"
                            ${showTitle ? `title="${label}"` : ``}
                        >
                            ${label}
                        </div>
                        <div class="cascader-container_menus_menu_item_icon">
                            ${children.length ? ">" : ""}
                        </div>
                    </div>
                `;
		}

		html += `</div>`;

		this.query(".cascader-container_menus")?.insertAdjacentHTML("beforeend", html);
	}
	private event() {
		const { mode = "single" } = this.options;

		const cascaderContainer = this.query(`.cascader-container_${this.uuid}`, true);

		document.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (!cascaderContainer?.contains(target) && !target.classList.contains(`cascader-container_value_placeholder`)) {
				this.menusHide();
			}
		});

		if (cascaderContainer) {
			cascaderContainer.onclick = (e) => {
				const target = e.target as HTMLElement;
				const targetClassList = target.classList;

				if (
					targetClassList.contains(`cascader-container_${this.uuid}`) ||
					targetClassList.contains(`cascader-container_value`) ||
					targetClassList.contains(`cascader-container_value_placeholder`) ||
					targetClassList.contains(`cascader-container_value_item`) ||
					targetClassList.contains(`cascader-container_arrow`) ||
					targetClassList.contains(`cascader-container_arrow_icon`)
				) {
					this.menusShow();
				} else if (target.closest(".cascader-container_clear")) {
					this.setValue([]);
				} else {
					const currentItem = target.closest(".cascader-container_menus_menu_item:not(.cascader-container_menus_menu_item_disabled)") as HTMLElement;

					if (currentItem) {
						const currentItemTag = currentItem.dataset.tag ?? "";
						const currentValue = currentItemTag.split(this.splitStr);
						const nextLevelData = this.getNextLevelData(currentValue);

						const currentMultipleItem = target.closest(
							".cascader-container_menus_menu_item_multiple:not(.cascader-container_menus_menu_item_multiple_disabled)",
						) as HTMLElement;

						if (currentMultipleItem && nextLevelData.length !== 0) {
							this.valValue = [...this.valValue.filter((ele) => ele.join(this.splitStr).indexOf(currentItemTag) === -1)];

							if (!currentItem.classList.contains("cascader-container_menus_menu_item_full")) {
								const recursion = (data: CascaderOptionsData, values: string[]) => {
									const { value, children } = data ?? {};

									if (children) {
										const arr: string[][] = [];

										for (let index = 0; index < children.length; index++) {
											arr.push(...recursion(children[index], [...values, value]));
										}

										return arr;
									}

									return [[...values, value]];
								};

								const valueArr: any[] = [];

								for (let index = 0; index < nextLevelData.length; index++) {
									const element = nextLevelData[index];
									valueArr.push(...recursion(element, currentValue));
								}

								this.valValue = [...this.valValue, ...valueArr];
							}
						} else {
							this.selectItem(currentItem);

							if (nextLevelData.length === 0) {
								if (mode === "multiple") {
									if (this.valValue.map((ele) => ele.join(this.splitStr)).indexOf(currentValue.join(this.splitStr)) !== -1) {
										const index = this.valValue.map((ele) => ele.join(this.splitStr)).findIndex((ele) => ele === currentValue.join(this.splitStr));
										this.valValue.splice(index, 1);
									} else {
										this.valValue.push(currentValue);
									}
								} else {
									this.valValue = [...currentValue];
									this.menusHide();
								}
							} else {
								const currentItemLevel = parseInt(currentItem.dataset.parentLevel ?? "0");
								this.createMenu(nextLevelData, currentItemLevel + 1, currentItemTag);
							}
						}

						this.renderValue(this.valValue);
						this.options.onChange?.(this.valValue, this.transformValue("getLabelValue", this.valValue), this.transformValue("getIndexValue", this.valValue));
					}
				}
			};
		}
	}

	constructor(container: string, options: CascaderOptions) {
		this.container = container;
		this.uuid = this.randomStr(6);
		this.options = options ?? {};
		const { data = [] } = this.options;

		if (!container) {
			console.error("container selector is required");
			return;
		}

		if (["document", "body"].indexOf(container) !== -1) {
			console.error(`The value of container cannot be '${container}'`);
			return;
		}

		if (!Array.isArray(data)) {
			console.error(`data must be array`);
			return;
		}
	}

	init() {
		const { mode = "single", data = [], defaultValue, showClear = true, placeholder = "" } = this.options;

		const container = this.query(this.container, true);

		if (!container) {
			console.error("can not find container");
			return;
		}

		const isMultiple = mode === "multiple" ? `cascader-container_multiple` : ``;

		const clearSvg = `<div class="cascader-container_clear">&times;</div>`;

		container.innerHTML = `
            <div class="cascader-container cascader-container_${this.uuid} ${isMultiple}">
                <div class="cascader-container_value"></div>
                ${showClear ? clearSvg : ""}
                <div class="cascader-container_arrow">
                    <div class="cascader-container_arrow_icon">
                    </div>
                </div>
                <div class="cascader-container_menus"></div>
            </div>
        `;

		this.createMenu(data);

		this.event();

		this.setValue(defaultValue);
	}

	setValue(value: any[] = []) {
		if (!Array.isArray(value)) {
			console.error(`value must be array`);
			return;
		}

		const { data = [], mode = "single" } = this.options;

		if (mode === "multiple") {
			if (!value.every((ele) => Array.isArray(ele))) {
				console.error(
					`value must be two-dimensional array in multiple mode. like this: [["sichuan", "chengdu", "jinli"], ["sichuan", "chengdu", "wuhouci"], ["hongkong"]]`,
				);
				return;
			}
		}

		const allMenu = this.queryAll(".cascader-container_menus_menu") ?? [];
		for (let index = 0; index < allMenu.length; index++) {
			const element = allMenu[index] as HTMLElement;
			this.query(".cascader-container_menus")?.removeChild(element);
		}
		this.createMenu(data);

		const getValue = (value: any[]) => {
			let valueArr: any[] = [];

			if (value.every((item) => typeof item === "string") || value.every((item) => typeof item === "number")) {
				if (value.every((item) => typeof item === "number")) {
					valueArr = [...this.transformValue("getValue", value)];
				} else {
					valueArr = [...value];
				}

				for (let index = 0; index < valueArr.length; index++) {
					const levelValue = valueArr.slice(0, index + 1);
					const tagStr = levelValue.join(this.splitStr);
					const currentItem = this.query(`.cascader-container_menus_menu_item[data-tag="${tagStr}"]`);
					const nextLevelData = this.getNextLevelData(levelValue);

					if (nextLevelData.length !== 0) {
						const menu = this.query(`.cascader-container_menus_menu[data-level="${index + 1}"]`);

						if (menu) {
							this.query(`.cascader-container_menus`)?.removeChild(menu);
						}

						this.createMenu(nextLevelData, index + 1, tagStr);
					}

					if (mode !== "multiple") {
						currentItem?.classList.add("cascader-container_menus_menu_item_active");
					}
				}
			}

			return valueArr;
		};

		if (mode === "multiple") {
			const valueArr = [];

			for (let index = 0; index < value.length; index++) {
				const element = value[index];
				valueArr.push(getValue(element));
			}

			this.valValue = [...valueArr];
		} else {
			this.valValue = [...getValue(value)];
		}

		this.renderValue(this.valValue);
	}

	get value() {
		return this.valValue;
	}

	get labelValue() {
		return this.transformValue("getLabelValue", this.valValue);
	}

	get indexValue() {
		return this.transformValue("getIndexValue", this.valValue);
	}
}

export type CascaderInstance = InstanceType<typeof Cascader>;
