if (!Element.prototype.matches) {
	Element.prototype.matches =
		Element.prototype.matchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector ||
		Element.prototype.oMatchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		function (s) {
			var matches = (this.document || this.ownerDocument).querySelectorAll(s),
				i = matches.length;
			while (--i >= 0 && matches.item(i) !== this) {}
			return i > -1;
		};
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function (s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement;
		} while (el !== null);
		return null;
	};
}

export default class Cascader {
	#container;
	#number;
	#options;
	#value = [];
	#labelValue = [];
	#linkedList = [];
	constructor(container, options) {
		if (!container) {
			console.error("container selector is required");

			return;
		}

		if (["document", "body"].includes(container)) {
			console.error(`The value of container cannot be '${container}'`);

			return;
		}

		this.#container = container;
		this.#number = (+new Date()).toString();
		this.#options = options || {};
	}

	#query(selector, pure) {
		return (
			pure
				? document
				: document.querySelector(`.cascader-container-${this.#number}`)
		).querySelector(selector);
	}

	#queryAll(selector, pure) {
		return (
			pure
				? document
				: document.querySelector(`.cascader-container-${this.#number}`)
		).querySelectorAll(selector);
	}

	#injectCss() {
		const {
			width = 227,
			height = 40,
			itemHeight = 35,
			showClear,
		} = this.#options;

		const styles = `
			.cascader-container {
				box-sizing: border-box;
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: ${width}px;
				min-height: ${height}px;
				border: 1px solid rgb(217, 217, 217);
				border-radius: 6px;
				padding: 0 12px 0 15px;
				color: rgba(0, 0, 0, 0.88);
				cursor: pointer;
			}

			.cascader-container div {
				box-sizing: border-box;
			}

			.cascader-container:hover, .cascader-container.gray {
				border-color: rgb(64, 150, 255);
			}

			.cascader-container .cascader-value {
				max-width: ${width - 10 - 12 - 15 - 10}px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.cascader-container.gray .cascader-value {
				color: rgba(0, 0, 0, 0.25);
			}

			.cascader-container .cascader-value.cascader-value-multiple {
				display: flex;
				flex-wrap: wrap;
			}

			.cascader-container .cascader-value.cascader-value-multiple > div {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: ${width - 10 - 12 - 15 - 10}px;
				background-color: rgba(0, 0, 0, 0.06);
				border-radius: 4px;
				margin: 2px 0;
				padding: 5px 6px;
			}

			.cascader-container .cascader-value.cascader-value-multiple > div > div:first-child {
				width: 88%;
				color: rgba(0, 0, 0, 0.88);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}

			.cascader-container .cascader-value.cascader-value-multiple > div > div:last-child {
				color: rgba(0, 0, 0, 0.88);
			}

			.cascader-container .cascader-menus {
				position: absolute;
				left: 0;
				display: flex;
				visibility: hidden;
				border-radius: 6px;
				box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
			}

			.cascader-container .cascader-menus.active {
				visibility: visible;
			}

			.cascader-container .cascader-menus .cascader-menu {
				padding: 3px;
				background: #fff;
			}

			.cascader-container .cascader-menus .cascader-menu + .cascader-menu {
				border-left: 1px solid rgba(5, 5, 5, 0.06);
			}

			.cascader-container .cascader-menus .cascader-menu .cascader-menu-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: ${itemHeight}px;
				border-radius: 6px;
				padding: 0 12px;
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item:hover {
				background: rgba(0, 0, 0, 0.06);
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item.disabled {
				cursor: default;
				cursor: not-allowed;
				color: rgba(0, 0, 0, 0.25);
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item.active {
				background: rgb(230, 244, 255);
			}

			.cascader-container
				.cascader-menus-multiple
				.cascader-menu
				.cascader-menu-item
				> div:first-child {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 18px;
				height: 18px;
				border: 1px solid rgba(0, 0, 0, 0.25);
				border-radius: 3px;
				margin-right: 5px;
			}

			.cascader-container
				.cascader-menus-multiple
				.cascader-menu
				.cascader-menu-item
				> div:first-child div span {
				display: none;
				font-size: 12px;
				color: #fff;
			}

			.cascader-container
				.cascader-menus-multiple
				.cascader-menu
				.cascader-menu-item.multiple-active
				> div:first-child {
				background-color: #1677ff;
				border-color: #1677ff;
			}

			.cascader-container
				.cascader-menus-multiple
				.cascader-menu
				.cascader-menu-item.multiple-active
				> div:first-child div span {
				display: block;
			}

			.cascader-container
				.cascader-menus-multiple
				.cascader-menu
				.cascader-menu-item.multiple-active-half
				> div:first-child div {
				width: 9px;
				height: 9px;
				background-color: #1677ff;
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item
				.cascader-menu-item-label {
				white-space: nowrap;
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item
				> div:last-child {
				margin-left: 10px;
				color: rgba(0, 0, 0, 0.45);
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item.disabled
				> div:last-child {
				color: rgba(0, 0, 0, 0.25);
			}

			.cascader-container .cascader-arrow {
				width: 0;
				height: 0;
				border-left: 5px solid transparent;
				border-right: 5px solid transparent;
				border-top: 5px solid #000;
			}

			${
				showClear
					? `.cascader-container .cascader-clear {
					display: none;
					font-size: 14px;
					color: #bcbcbc;
				}

				.cascader-container:hover .cascader-arrow {
					display: none;
				}

				.cascader-container:hover .cascader-clear {
					display: flex;
				}`
					: ``
			}
		`;
		const styleTag = document.createElement("style");
		styleTag.type = "text/css";

		if (styleTag.styleSheet) {
			styleTag.styleSheet.cssText = styles;
		} else {
			styleTag.appendChild(document.createTextNode(styles));
		}

		document.head.appendChild(styleTag);
	}

	#menusShow() {
		this.#query(`.cascader-container-${this.#number}`, true).classList.add(
			"gray"
		);
		this.#query(".cascader-menus").classList.add("active");
	}

	#menusHide() {
		this.#query(`.cascader-container-${this.#number}`, true).classList.remove(
			"gray"
		);
		this.#query(".cascader-menus").classList.remove("active");
	}

	#createMenu(menuData) {
		const { mode = "single" } = this.#options;

		let html = `<div class="cascader-menu">`;
		for (const iterator of menuData) {
			const { className, label, value, disabled, children, showTitle } =
				iterator;
			html += `
				<div class="cascader-menu-item${className ? ` ${className}` : ``}${
				disabled ? ` disabled` : ``
			}"
					${showTitle ? `title="${label}"` : ``}
					data-label="${label}"
					data-value="${value}"
				>
					${mode === "multiple" ? "<div><div><span>&radic;</span></div></div>" : ""}
					<div class="cascader-menu-item-label">${label}</div>
					<div>${Array.isArray(children) ? ">" : ""}</div>
				</div>
			`;
		}
		html += `</div>`;

		return html;
	}

	#getSiblings(element) {
		var siblings = [];
		var sibling = element.parentNode.firstChild;

		while (sibling) {
			if (sibling.nodeType === 1 && sibling !== element) {
				siblings.push(sibling);
			}

			sibling = sibling.nextSibling;
		}

		return siblings;
	}

	#getSiblingsIndex(element) {
		var siblings = Array.prototype.slice.call(element.parentNode.children);
		var index = siblings.indexOf(element);
		return index;
	}

	#findItemByValue(data, targetValue) {
		for (const iterator of data) {
			if (iterator.value === targetValue) {
				return iterator;
			}

			if (iterator.children && iterator.children.length > 0) {
				var result = this.#findItemByValue(iterator.children, targetValue);
				if (result) {
					return result;
				}
			}
		}

		return null;
	}

	#multipleItemRender() {
		const menuItemArr = this.#queryAll(".cascader-menu-item");

		for (const iterator of menuItemArr) {
			iterator.classList.remove("multiple-active", "multiple-active-half");
		}

		for (const iterator of this.#value) {
			for (let index = 0; index < iterator.length; index++) {
				const element = iterator[index];
				const ele = this.#query(`.cascader-menu-item[data-value=${element}]`);

				if (ele) {
					if (index === iterator.length - 1) {
						ele.classList.add("multiple-active");
					} else {
						ele.classList.add("multiple-active-half");
					}
				}
			}
		}
	}

	#multipleDisplayRender() {
		const { displayRender } = this.#options;

		let displayStr = ``;
		if (typeof displayRender === "function") {
			for (let index = 0; index < this.#labelValue.length; index++) {
				const element = this.#labelValue[index];
				const currentValue = this.#value[index];
				displayStr += `<div><div>${displayRender(
					element
				)}</div><div class="cascader-multiple-value-del" data-link-list-value="${
					currentValue[currentValue.length - 1]
				}">×</div></div>`;
			}
		} else {
			for (let index = 0; index < this.#labelValue.length; index++) {
				const element = this.#labelValue[index];
				const currentValue = this.#value[index];
				displayStr += `<div><div>${element.join(
					"/"
				)}</div><div class="cascader-multiple-value-del" data-link-list-value="${
					currentValue[currentValue.length - 1]
				}">×</div></div>`;
			}
		}
		this.#query(".cascader-value").innerHTML = displayStr;
	}

	#event() {
		const cascaderContainer = this.#query(
			`.cascader-container-${this.#number}`,
			true
		);
		const menus = this.#query(".cascader-menus");
		const { mode = "single", options = [], displayRender } = this.#options;

		document.addEventListener("click", (e) => {
			const target = e.target;
			const isClickInside = cascaderContainer.contains(target);

			if (!isClickInside) {
				this.#menusHide();
			}
		});

		this.#query(this.#container, true).addEventListener("click", (e) => {
			const target = e.target;
			const isClickInside = cascaderContainer.contains(target);

			const currentMenuItem = target.closest(".cascader-menu-item");
			if (currentMenuItem) {
				if (currentMenuItem.classList.contains("disabled")) {
					return;
				}

				const isOrigin = e.pageX !== 0;

				const key = currentMenuItem.dataset.value;

				currentMenuItem.classList.add("active");
				for (const iterator of this.#getSiblings(currentMenuItem)) {
					iterator.classList.remove("active");
				}

				const level = this.#getSiblingsIndex(currentMenuItem.parentNode);
				const menuArr = this.#queryAll(".cascader-menu");
				for (let index = 0; index < menuArr.length; index++) {
					const element = menuArr[index];
					if (index > level) {
						menus.removeChild(element);
					}
				}

				const children = this.#findItemByValue(options, key)?.children;
				if (children) {
					menus.insertAdjacentHTML("beforeend", this.#createMenu(children));
				} else {
					const valueArr = [];
					const labelArr = [];
					const menuItemArr = this.#queryAll(".cascader-menu-item.active");

					if (mode === "multiple") {
						const lastMenuItem = menuItemArr[menuItemArr.length - 1];
						const linkedListValue = lastMenuItem.dataset.value;
						const linkedListIndex = this.#linkedList.findIndex(
							(ele) => ele === linkedListValue
						);

						if (linkedListIndex === -1) {
							for (const iterator of menuItemArr) {
								valueArr.push(iterator.dataset.value);
								labelArr.push(iterator.dataset.label);
							}

							this.#value.push(valueArr);
							this.#labelValue.push(labelArr);
							this.#linkedList.push(linkedListValue);
						} else {
							this.#value.splice(linkedListIndex, 1);
							this.#labelValue.splice(linkedListIndex, 1);
							this.#linkedList.splice(linkedListIndex, 1);
						}

						this.#multipleDisplayRender();

						// console.log(this.#value, this.#labelValue, this.#linkedList);
					} else {
						for (const iterator of menuItemArr) {
							valueArr.push(iterator.dataset.value);
							labelArr.push(iterator.dataset.label);
						}

						this.#value = valueArr;
						this.#labelValue = labelArr;

						let displayStr = ``;
						if (typeof displayRender === "function") {
							displayStr = displayRender(this.#labelValue);
						} else {
							displayStr = this.#labelValue.join("/");
						}
						this.#query(".cascader-value").innerHTML = displayStr;

						this.#menusHide();
					}

					isOrigin && this.#options.onChange?.(this.#value, this.#labelValue);
				}

				if (mode === "multiple") {
					this.#multipleItemRender();
				}

				return false;
			} else if (target.matches(".cascader-clear")) {
				this.reset();
				return false;
			} else if (target.matches(".cascader-multiple-value-del")) {
				const linkListValue = target.dataset.linkListValue;
				const linkedListIndex = this.#linkedList.findIndex(
					(ele) => ele === linkListValue
				);

				for (const iterator of [
					this.#value,
					this.#labelValue,
					this.#linkedList,
				]) {
					iterator.splice(linkedListIndex, 1);
				}

				this.#multipleItemRender();
				this.#multipleDisplayRender();

				if (this.#value.length === 0) {
					this.reset();
				}

				return false;
			}

			if (isClickInside) {
				if (mode === "single") {
					this.setValue(this.#value);
				}

				this.#menusShow();
			}
		});
	}

	init() {
		const container = this.#query(this.#container, true);
		const {
			options = [],
			defaultValue = [],
			placeholder = "",
			showClear,
			mode = "single",
		} = this.#options;

		container.innerHTML = `
			<div class="cascader-container cascader-container-${this.#number}">
				<div class="cascader-value ${
					mode === "multiple" ? "cascader-value-multiple" : ""
				}"><span style="color: rgba(0, 0, 0, 0.25);">${placeholder}</span></div>
				<div class="cascader-menus ${
					mode === "multiple" ? "cascader-menus-multiple" : ""
				}">
					${this.#createMenu(options)}
				</div>
				<div class="cascader-arrow"></div>
				${showClear ? `<div class="cascader-clear">×</div>` : ``}
			</div>
		`;

		this.#injectCss();

		this.#query(".cascader-menus").style.bottom = `-${
			this.#query(".cascader-menus").offsetHeight + 5
		}px`;

		this.#event();

		this.setValue(defaultValue);
	}

	reset() {
		const { placeholder = "" } = this.#options;

		this.#value = [];
		this.#labelValue = [];
		this.#linkedList = [];
		this.#query(
			".cascader-value"
		).innerHTML = `<span style="color: rgba(0, 0, 0, 0.25);">${placeholder}</span>`;

		this.setValue();
	}

	setValue(value) {
		const { mode = "single", options = [] } = this.#options;

		if (Array.isArray(value) && value.length) {
			for (const iterator of value) {
				if (mode === "multiple") {
					for (const item of iterator) {
						this.#query(`.cascader-menu-item[data-value=${item}]`).click?.();
					}
				} else {
					this.#query(`.cascader-menu-item[data-value=${iterator}]`).click?.();
				}
			}
		} else {
			this.#query(".cascader-menus").innerHTML = this.#createMenu(options);
		}
	}

	get value() {
		return this.#value;
	}

	get labelValue() {
		return this.#labelValue;
	}
}
