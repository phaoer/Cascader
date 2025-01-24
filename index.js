function e(e,n,t){if(t||2===arguments.length)for(var a,r=0,i=n.length;r<i;r++)!a&&r in n||(a||(a=Array.prototype.slice.call(n,0,r)),a[r]=n[r]);return e.concat(a||Array.prototype.slice.call(n))}"function"==typeof SuppressedError&&SuppressedError,Array.prototype.find||(Array.prototype.find=function(e,n){if(null==this)throw new TypeError("Array.prototype.find called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");var t,a=Object(this),r=a.length>>>0;arguments.length>1&&(t=n);for(var i=0;i<r;i++)if(i in a){var o=a[i];if(e.call(t,o,i,a))return o}}),Array.prototype.findIndex||(Array.prototype.findIndex=function(e,n){if(null==this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");var t,a=Object(this),r=a.length>>>0;arguments.length>1&&(t=n);for(var i=0;i<r;i++)if(i in a){var o=a[i];if(e.call(t,o,i,a))return i}return-1}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(e){var n=this;if(!document.documentElement.contains(n))return null;do{if(n.matches(e))return n;n=n.parentElement}while(null!==n);return null});var n=function(){function n(e,n){this.splitStr="__CASCADER_SPLIT__",this.valValue=[],this.container=e,this.uuid=this.randomStr(6),this.options=null!=n?n:{};var t=this.options.data,a=void 0===t?[]:t;e?-1===["document","body"].indexOf(e)?Array.isArray(a)||console.error("data must be array"):console.error("The value of container cannot be '".concat(e,"'")):console.error("container selector is required")}return n.prototype.randomStr=function(e){for(var n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",t="",a=0;a<e;a++){t+=n[Math.floor(62*Math.random())]}return t},n.prototype.query=function(e,n){var t;return null===(t=n?document:document.querySelector(".cascader-container_".concat(this.uuid)))||void 0===t?void 0:t.querySelector(e)},n.prototype.queryAll=function(e,n){var t;return null===(t=n?document:document.querySelector(".cascader-container_".concat(this.uuid)))||void 0===t?void 0:t.querySelectorAll(e)},n.prototype.getSiblings=function(e){for(var n,t=[],a=null===(n=null==e?void 0:e.parentNode)||void 0===n?void 0:n.firstChild;a;)1===a.nodeType&&a!==e&&t.push(a),a=a.nextSibling;return t},n.prototype.menusShow=function(){var e,n,t=this.options.mode;"multiple"!==(void 0===t?"single":t)&&this.setValue(this.valValue),null===(e=this.query(".cascader-container_".concat(this.uuid),!0))||void 0===e||e.classList.add("cascader-container_active"),null===(n=this.query(".cascader-container_menus"))||void 0===n||n.classList.add("cascader-container_menus_active")},n.prototype.menusHide=function(){var e,n;null===(e=this.query(".cascader-container_".concat(this.uuid),!0))||void 0===e||e.classList.remove("cascader-container_active"),null===(n=this.query(".cascader-container_menus"))||void 0===n||n.classList.remove("cascader-container_menus_active")},n.prototype.calculateElementWidth=function(e){var n,t=document.createElement("div");t.style.position="absolute",t.style.top="-10000px",t.innerHTML=e;var a=null===(n=t.children)||void 0===n?void 0:n[0];a.style.boxSizing="border-box",a.style.fontSize="14px",document.body.appendChild(t);var r=a.offsetWidth;return document.body.removeChild(t),r},n.prototype.selectItem=function(e){for(var n,t,a,r,i=parseInt(null!==(n=e.dataset.parentLevel)&&void 0!==n?n:"0"),o=this.getSiblings(e),l=0;l<o.length;l++){(u=o[l]).classList.remove("cascader-container_menus_menu_item_active")}e.classList.add("cascader-container_menus_menu_item_active");var c=null!==(t=this.queryAll(".cascader-container_menus_menu"))&&void 0!==t?t:[];for(l=0;l<c.length;l++){var u=c[l];parseInt(null!==(a=u.dataset.level)&&void 0!==a?a:"0")>i&&(null===(r=this.query(".cascader-container_menus"))||void 0===r||r.removeChild(u))}},n.prototype.renderValue=function(n){var t,a,r,i=this;void 0===n&&(n=[]);var o=this.options,l=o.displayRender,c=o.mode,u=void 0===c?"single":c,s=o.placeholder,d=void 0===s?"":s,v=[],m=[];if("multiple"===u){for(var f=null!==(t=this.queryAll(".cascader-container_menus_menu_item"))&&void 0!==t?t:[],p=0;p<f.length;p++){null==(h=f[p])||h.classList.remove("cascader-container_menus_menu_item_half"),null==h||h.classList.remove("cascader-container_menus_menu_item_full")}for(p=0;p<this.valValue.length;p++){var h=this.valValue[p],_=this.query('.cascader-container_menus_menu_item[data-tag="'.concat(h.join(this.splitStr),'"]'));null==_||_.classList.add("cascader-container_menus_menu_item_full");for(var y=function(n){var t=h.slice(0,h.length-1-n);if(-1!==m.map((function(e){return e.join(i.splitStr)})).indexOf(t.join(g.splitStr)))return"continue";var a=g.getNextLevelData(t),r=function(n,t){var a=null!=n?n:{},o=a.value,l=a.children;if(l){for(var c=0,u=0;u<l.length;u++)r(l[u],e(e([],t,!0),[o],!1))&&c++;return c===l.length}return-1!==i.valValue.findIndex((function(e){return e.join(i.splitStr)==="".concat(t.join(i.splitStr)).concat(i.splitStr).concat(o)}))},o=a.reduce((function(e,n){return r(n,t)?e+1:e}),0),l=g.query('.cascader-container_menus_menu_item[data-tag="'.concat(t.join(g.splitStr),'"]'));o===a.length?(null==l||l.classList.add("cascader-container_menus_menu_item_full"),v.push(t)):null==l||l.classList.add("cascader-container_menus_menu_item_half"),m.push(t)},g=this,V=0;V<h.length-1;V++)y(V)}}var b=this.query(".cascader-container_value");if(b){if(0===n.length)return void(b.innerHTML='<span class="cascader-container_value_placeholder">'.concat(d,"</span>"));var S=this.transformValue("getLabelValue",n),L=function(e){return"function"==typeof l?l(e):e.join("/")};if("multiple"===u){var q=[],x=function(e){var t=n[e],a=S[e];if(v.filter((function(e){return 1===e.length})).find((function(e){return-1!==t.join(i.splitStr).indexOf(e.join(""))}))&&(a=a.slice(0,1)),-1!==q.map((function(e){return e.join(i.splitStr)})).indexOf(a.join("")))return"continue";q.push(a)};for(p=0;p<n.length;p++)x(p);var j="",A=null!==(r=null===(a=this.query(".cascader-container_value"))||void 0===a?void 0:a.offsetWidth)&&void 0!==r?r:0,w=0;for(p=0;p<q.length;p++){h=q[p];var E='<div class="cascader-container_value_item">'.concat(L(h),"</div>"),I=w+this.calculateElementWidth(E)+5;if(!(I<=A)){j+='<div class="cascader-container_value_item">...</div>';break}j+=E,w=I}b.innerHTML=j}else b.innerHTML=L(S)}},n.prototype.getNextLevelData=function(e){void 0===e&&(e=[]);var n=this.options.data,t=void 0===n?[]:n;return e.reduce((function(e,n){var t,a;return null!==(a=null===(t=e.find((function(e){return e.value===n})))||void 0===t?void 0:t.children)&&void 0!==a?a:[]}),t)},n.prototype.transformValue=function(n,t){void 0===t&&(t=[]);var a=this.options,r=a.data,i=void 0===r?[]:r,o=a.mode,l=function(t){for(var a,r,o,l,c,u,s=[],d=e([],i,!0),v=function(e){var i=t[e];if("getValue"===n)s.push(null===(a=d[i])||void 0===a?void 0:a.value),d=null!==(o=null===(r=d[i])||void 0===r?void 0:r.children)&&void 0!==o?o:[];else if("getLabelValue"===n){var v=d.find((function(e){return e.value===i}));s.push(null==v?void 0:v.label),d=null!==(l=null==v?void 0:v.children)&&void 0!==l?l:[]}else"getIndexValue"===n&&(s.push(d.findIndex((function(e){return e.value===i}))),d=null!==(u=null===(c=d.find((function(e){return e.value===i})))||void 0===c?void 0:c.children)&&void 0!==u?u:[])},m=0;m<t.length;m++)v(m);return s};if("multiple"===(void 0===o?"single":o)){for(var c=[],u=0;u<t.length;u++){var s=t[u];c.push(l(s))}return c}return l(t)},n.prototype.createMenu=function(e,n,t){var a;void 0===e&&(e=[]),void 0===n&&(n=0),void 0===t&&(t="");for(var r=this.options.mode,i=void 0===r?"single":r,o='<div class="cascader-container_menus_menu" data-level="'.concat(n,'">'),l=0;l<e.length;l++){var c=e[l],u=c.className,s=c.showTitle,d=c.disabled,v=c.children,m=void 0===v?[]:v,f=c.label,p=c.value,h="".concat(u?" ".concat(u):"").concat(d?" cascader-container_menus_menu_item_disabled":""),_=t?"".concat(t).concat(this.splitStr).concat(p):p,y="multiple"===i?'\n                        <div class="cascader-container_menus_menu_item_multiple '.concat(d?"cascader-container_menus_menu_item_multiple_disabled":"",'">\n                            <div>\n                                <span>&radic;</span>\n                            </div>\n                        </div>\n                    '):"";o+='\n                    <div class="cascader-container_menus_menu_item'.concat(h,'" data-parent-level="').concat(n,'" data-label="').concat(f,'" data-value="').concat(p,'" data-tag="').concat(_,'">\n                        ').concat(y,'\n                        <div\n                            class="cascader-container_menus_menu_item_value"\n                            ').concat(s?'title="'.concat(f,'"'):"","\n                        >\n                            ").concat(f,'\n                        </div>\n                        <div class="cascader-container_menus_menu_item_icon">\n                            ').concat(m.length?">":"","\n                        </div>\n                    </div>\n                ")}o+="</div>",null===(a=this.query(".cascader-container_menus"))||void 0===a||a.insertAdjacentHTML("beforeend",o)},n.prototype.event=function(){var n=this,t=this.options.mode,a=void 0===t?"single":t,r=this.query(".cascader-container_".concat(this.uuid),!0);document.addEventListener("click",(function(e){var t=e.target;(null==r?void 0:r.contains(t))||t.classList.contains("cascader-container_value_placeholder")||n.menusHide()})),r&&(r.onclick=function(t){var r,i,o,l,c=t.target,u=c.classList;if(u.contains("cascader-container_".concat(n.uuid))||u.contains("cascader-container_value")||u.contains("cascader-container_value_placeholder")||u.contains("cascader-container_value_item")||u.contains("cascader-container_arrow")||u.contains("cascader-container_arrow_icon"))n.menusShow();else if(c.closest(".cascader-container_clear"))n.setValue([]);else{var s=c.closest(".cascader-container_menus_menu_item:not(.cascader-container_menus_menu_item_disabled)");if(s){var d=null!==(r=s.dataset.tag)&&void 0!==r?r:"",v=d.split(n.splitStr),m=n.getNextLevelData(v);if(c.closest(".cascader-container_menus_menu_item_multiple:not(.cascader-container_menus_menu_item_multiple_disabled)")&&0!==m.length){if(n.valValue=e([],n.valValue.filter((function(e){return-1===e.join(n.splitStr).indexOf(d)})),!0),!s.classList.contains("cascader-container_menus_menu_item_full")){for(var f=function(n,t){var a=null!=n?n:{},r=a.value,i=a.children;if(i){for(var o=[],l=0;l<i.length;l++)o.push.apply(o,f(i[l],e(e([],t,!0),[r],!1)));return o}return[e(e([],t,!0),[r],!1)]},p=[],h=0;h<m.length;h++){var _=m[h];p.push.apply(p,f(_,v))}n.valValue=e(e([],n.valValue,!0),p,!0)}}else if(n.selectItem(s),0===m.length)if("multiple"===a)if(-1!==n.valValue.map((function(e){return e.join(n.splitStr)})).indexOf(v.join(n.splitStr))){h=n.valValue.map((function(e){return e.join(n.splitStr)})).findIndex((function(e){return e===v.join(n.splitStr)}));n.valValue.splice(h,1)}else n.valValue.push(v);else n.valValue=e([],v,!0),n.menusHide();else{var y=parseInt(null!==(i=s.dataset.parentLevel)&&void 0!==i?i:"0");n.createMenu(m,y+1,d)}n.renderValue(n.valValue),null===(l=(o=n.options).onChange)||void 0===l||l.call(o,n.valValue,n.transformValue("getLabelValue",n.valValue),n.transformValue("getIndexValue",n.valValue))}}})},n.prototype.init=function(){var e=this.options,n=e.mode,t=void 0===n?"single":n,a=e.data,r=void 0===a?[]:a,i=e.defaultValue,o=e.showClear,l=void 0===o||o;e.placeholder;var c=this.query(this.container,!0);if(c){var u="multiple"===t?"cascader-container_multiple":"";c.innerHTML='\n            <div class="cascader-container cascader-container_'.concat(this.uuid," ").concat(u,'">\n                <div class="cascader-container_value"></div>\n                ').concat(l?'<div class="cascader-container_clear">&times;</div>':"",'\n                <div class="cascader-container_arrow">\n                    <div class="cascader-container_arrow_icon">\n                    </div>\n                </div>\n                <div class="cascader-container_menus"></div>\n            </div>\n        '),this.createMenu(r),this.event(),this.setValue(i)}else console.error("can not find container")},n.prototype.setValue=function(n){var t,a,r=this;if(void 0===n&&(n=[]),Array.isArray(n)){var i=this.options,o=i.data,l=void 0===o?[]:o,c=i.mode,u=void 0===c?"single":c;if("multiple"!==u||n.every((function(e){return Array.isArray(e)}))){for(var s=null!==(t=this.queryAll(".cascader-container_menus_menu"))&&void 0!==t?t:[],d=0;d<s.length;d++){var v=s[d];null===(a=this.query(".cascader-container_menus"))||void 0===a||a.removeChild(v)}this.createMenu(l);var m=function(n){var t,a=[];if(n.every((function(e){return"string"==typeof e}))||n.every((function(e){return"number"==typeof e}))){a=n.every((function(e){return"number"==typeof e}))?e([],r.transformValue("getValue",n),!0):e([],n,!0);for(var i=0;i<a.length;i++){var o=a.slice(0,i+1),l=o.join(r.splitStr),c=r.query('.cascader-container_menus_menu_item[data-tag="'.concat(l,'"]')),s=r.getNextLevelData(o);if(0!==s.length){var d=r.query('.cascader-container_menus_menu[data-level="'.concat(i+1,'"]'));d&&(null===(t=r.query(".cascader-container_menus"))||void 0===t||t.removeChild(d)),r.createMenu(s,i+1,l)}"multiple"!==u&&(null==c||c.classList.add("cascader-container_menus_menu_item_active"))}}return a};if("multiple"===u){var f=[];for(d=0;d<n.length;d++){v=n[d];f.push(m(v))}this.valValue=e([],f,!0)}else this.valValue=e([],m(n),!0);this.renderValue(this.valValue)}else console.error('value must be two-dimensional array in multiple mode. like this: [["sichuan", "chengdu", "jinli"], ["sichuan", "chengdu", "wuhouci"], ["hongkong"]]')}else console.error("value must be array")},Object.defineProperty(n.prototype,"value",{get:function(){return this.valValue},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"labelValue",{get:function(){return this.transformValue("getLabelValue",this.valValue)},enumerable:!1,configurable:!0}),Object.defineProperty(n.prototype,"indexValue",{get:function(){return this.transformValue("getIndexValue",this.valValue)},enumerable:!1,configurable:!0}),n}();export{n as default};
