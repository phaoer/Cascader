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
	#options;
	#currentMenuItemKey;
	#value;
	#labelValue;
	constructor(container, options) {
		this.#container = container || "body";
		this.#options = options || {};

		if (window._CascaderIsInit) {
			console.error("Do not initialize Cascader repeatedly");
			return;
		}
		window._CascaderIsInit = true;
	}

	#query(selector) {
		return document.querySelector(selector);
	}

	#queryAll(selector) {
		return document.querySelectorAll(selector);
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
				height: ${height}px;
				border: 1px solid rgb(217, 217, 217);
				border-radius: 6px;
				padding: 0 12px 0 15px;
				color: rgba(0, 0, 0, 0.88);
				cursor: pointer;
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

			.cascader-container .cascader-menus {
				position: absolute;
				top: ${height + 5}px;
				left: 0;
				display: none;
				border-radius: 6px;
				box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
			}

			.cascader-container .cascader-menus.active {
				display: flex;
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
				.cascader-menus
				.cascader-menu
				.cascader-menu-item
				div:first-child {
				white-space: nowrap;
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item
				div:last-child {
				margin-left: 10px;
				color: rgba(0, 0, 0, 0.45);
			}

			.cascader-container
				.cascader-menus
				.cascader-menu
				.cascader-menu-item.disabled
				div:last-child {
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
		this.#query(".cascader-container").classList.add("gray");
		this.#query(".cascader-menus").classList.add("active");
	}

	#menusHide() {
		this.#query(".cascader-container").classList.remove("gray");
		this.#query(".cascader-menus").classList.remove("active");
	}

	#createMenu(menuData) {
		let html = `<div class="cascader-menu">`;
		for (const iterator of menuData) {
			const { className, label, value, disabled, children, showTitle } = iterator;
			html += `
				<div class="cascader-menu-item${className ? ` ${className}` : ``}${disabled ? ` disabled` : ``}"
					${showTitle ? `title="${label}"` : ``}
					data-label="${label}"
					data-value="${value}"
				>
					<div>${label}</div>
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
		for (let index = 0; index < data.length; index++) {
			const element = data[index];

			if (element.value === targetValue) {
				return element;
			}

			if (element.children && element.children.length > 0) {
				var result = this.#findItemByValue(element.children, targetValue);
				if (result) {
					return result;
				}
			}
		}

		return null;
	}

	#event() {
		const cascaderContainer = this.#query(".cascader-container");
		const menus = this.#query(".cascader-menus");
		const { options = [], displayRender } = this.#options;

		document.addEventListener("click", (e) => {
			const target = e.target;
			const isClickInside = cascaderContainer.contains(target);

			if (!isClickInside) {
				this.#menusHide();
			}

			const currentMenuItem = target.closest(".cascader-menu-item");
			if (currentMenuItem) {
				if (currentMenuItem.classList.contains("disabled")) {
					return;
				}

				const key = currentMenuItem.dataset.value;

				if (this.#currentMenuItemKey !== key) {
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

						for (let index = 0; index < menuItemArr.length; index++) {
							const element = menuItemArr[index];
							labelArr.push(element.dataset.label);
							valueArr.push(element.dataset.value);
						}

						this.#value = valueArr;
						this.#labelValue = labelArr;

						this.#options.onChange?.(valueArr, labelArr);

						let displayStr = ``;
						if (typeof displayRender === "function") {
							displayStr = displayRender(labelArr);
						} else {
							displayStr = labelArr.join("/");
						}
						this.#query(".cascader-value").innerHTML = displayStr;

						this.#menusHide();
					}
				}

				this.#currentMenuItemKey = key;
			} else if (
				target.matches(".cascader-container") ||
				target.matches(".cascader-value") ||
				target.matches(".cascader-arrow")
			) {
				if (menus.classList.contains("active")) {
					this.#menusHide();
				} else {
					this.#menusShow();
				}
			} else if (target.matches(".cascader-clear")) {
				this.reset();
			}
		});
	}

	init() {
		const container = this.#query(this.#container);
		const {
			options = [],
			defaultValue = [],
			placeholder = "",
			showClear,
		} = this.#options;

		container.innerHTML = `
			<div class="cascader-container">
				<div class="cascader-value"><span style="color: rgba(0, 0, 0, 0.25);">${placeholder}</span></div>
				<div class="cascader-menus">
					${this.#createMenu(options)}
				</div>
				<div class="cascader-arrow"></div>
				${showClear ? `<div class="cascader-clear">×</div>` : ``}
			</div>
		`;

		this.#injectCss();

		this.#event();

		this.setValue(defaultValue);
	}

	reset() {
		const { placeholder = "" } = this.#options;

		this.#value = [];
		this.#options.onChange?.([]);

		this.#labelValue = [];
		this.#query(
			".cascader-value"
		).innerHTML = `<span style="color: rgba(0, 0, 0, 0.25);">${placeholder}</span>`;

		this.setValue();
	}

	setValue(value) {
		const { options = [] } = this.#options;

		if (Array.isArray(value) && value.length) {
			for (let index = 0; index < value.length; index++) {
				const element = value[index];
				this.#query(`.cascader-menu-item[data-value=${element}]`).click?.();
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
