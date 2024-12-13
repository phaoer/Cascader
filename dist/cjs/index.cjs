"use strict";function t(t){var e=function(t,e){if("object"!=typeof t||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var a=n.call(t,e);if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t,"string");return"symbol"==typeof e?e:String(e)}function e(e,n,a){return n&&function(e,n){for(var a=0;a<n.length;a++){var r=n[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,t(r.key),r)}}(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function a(t,e){var a="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(a)return(a=a.call(t)).next.bind(a);if(Array.isArray(t)||(a=function(t,e){if(t){if("string"==typeof t)return n(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?n(t,e):void 0}}(t))||e){a&&(t=a);var r=0;return function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r=0;function i(t){return"__private_"+r+++"_"+t}function c(t,e){if(!Object.prototype.hasOwnProperty.call(t,e))throw new TypeError("attempted to use private field on non-instance");return t}Element.prototype.matches||(Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector||function(t){for(var e=(this.document||this.ownerDocument).querySelectorAll(t),n=e.length;--n>=0&&e.item(n)!==this;);return n>-1}),Element.prototype.closest||(Element.prototype.closest=function(t){var e=this;if(!document.documentElement.contains(e))return null;do{if(e.matches(t))return e;e=e.parentElement}while(null!==e);return null});var s=i("container"),l=i("number"),d=i("options"),o=i("value"),u=i("labelValue"),v=i("linkedList"),p=i("query"),m=i("queryAll"),h=i("injectCss"),f=i("menusShow"),b=i("menusHide"),y=i("createMenu"),g=i("getSiblings"),x=i("getSiblingsIndex"),w=i("findItemByValue"),j=i("multipleItemRender"),O=i("multipleDisplayRender"),S=i("event"),P=function(){function t(t,e){Object.defineProperty(this,S,{value:z}),Object.defineProperty(this,O,{value:I}),Object.defineProperty(this,j,{value:q}),Object.defineProperty(this,w,{value:V}),Object.defineProperty(this,x,{value:H}),Object.defineProperty(this,g,{value:C}),Object.defineProperty(this,y,{value:M}),Object.defineProperty(this,b,{value:T}),Object.defineProperty(this,f,{value:A}),Object.defineProperty(this,h,{value:E}),Object.defineProperty(this,m,{value:k}),Object.defineProperty(this,p,{value:L}),Object.defineProperty(this,s,{writable:!0,value:void 0}),Object.defineProperty(this,l,{writable:!0,value:void 0}),Object.defineProperty(this,d,{writable:!0,value:void 0}),Object.defineProperty(this,o,{writable:!0,value:[]}),Object.defineProperty(this,u,{writable:!0,value:[]}),Object.defineProperty(this,v,{writable:!0,value:[]}),t?["document","body"].includes(t)?console.error("The value of container cannot be '"+t+"'"):(c(this,s)[s]=t,c(this,l)[l]=(+new Date).toString(),c(this,d)[d]=e||{}):console.error("container selector is required")}var n=t.prototype;return n.init=function(){var t=c(this,p)[p](c(this,s)[s],!0),e=c(this,d)[d],n=e.options,a=void 0===n?[]:n,r=e.defaultValue,i=void 0===r?[]:r,o=e.placeholder,u=void 0===o?"":o,v=e.showClear,m=e.mode,f=void 0===m?"single":m;t.innerHTML='\n\t\t\t<div class="cascader-container cascader-container-'+c(this,l)[l]+'">\n\t\t\t\t<div class="cascader-value '+("multiple"===f?"cascader-value-multiple":"")+'"><span style="color: rgba(0, 0, 0, 0.25);">'+u+'</span></div>\n\t\t\t\t<div class="cascader-menus '+("multiple"===f?"cascader-menus-multiple":"")+'">\n\t\t\t\t\t'+c(this,y)[y](a)+'\n\t\t\t\t</div>\n\t\t\t\t<div class="cascader-arrow"></div>\n\t\t\t\t'+(v?'<div class="cascader-clear">×</div>':"")+"\n\t\t\t</div>\n\t\t",c(this,h)[h](),c(this,p)[p](".cascader-menus").style.bottom="-"+(c(this,p)[p](".cascader-menus").offsetHeight+5)+"px",c(this,S)[S](),this.setValue(i)},n.reset=function(){var t=c(this,d)[d].placeholder,e=void 0===t?"":t;c(this,o)[o]=[],c(this,u)[u]=[],c(this,v)[v]=[],c(this,p)[p](".cascader-value").innerHTML='<span style="color: rgba(0, 0, 0, 0.25);">'+e+"</span>",this.setValue()},n.setValue=function(t){var e=c(this,d)[d],n=e.mode,r=void 0===n?"single":n,i=e.options,s=void 0===i?[]:i;if(Array.isArray(t)&&t.length)for(var l,o=a(t);!(l=o()).done;){var u,v,m=l.value;if("multiple"===r)for(var h,f=a(m);!(h=f()).done;){var b,g,x=h.value;null==(b=(g=c(this,p)[p](".cascader-menu-item[data-value="+x+"]")).click)||b.call(g)}else null==(u=(v=c(this,p)[p](".cascader-menu-item[data-value="+m+"]")).click)||u.call(v)}else c(this,p)[p](".cascader-menus").innerHTML=c(this,y)[y](s)},e(t,[{key:"value",get:function(){return c(this,o)[o]}},{key:"labelValue",get:function(){return c(this,u)[u]}}]),t}();function L(t,e){return(e?document:document.querySelector(".cascader-container-"+c(this,l)[l])).querySelector(t)}function k(t,e){return(e?document:document.querySelector(".cascader-container-"+c(this,l)[l])).querySelectorAll(t)}function E(){var t=c(this,d)[d],e=t.width,n=void 0===e?227:e,a=t.height,r=void 0===a?40:a,i=t.itemHeight,s="\n\t\t\t.cascader-container {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t\tposition: relative;\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: space-between;\n\t\t\t\talign-items: center;\n\t\t\t\twidth: "+n+"px;\n\t\t\t\tmin-height: "+r+"px;\n\t\t\t\tborder: 1px solid rgb(217, 217, 217);\n\t\t\t\tborder-radius: 6px;\n\t\t\t\tpadding: 0 12px 0 15px;\n\t\t\t\tcolor: rgba(0, 0, 0, 0.88);\n\t\t\t\tcursor: pointer;\n\t\t\t}\n\n\t\t\t.cascader-container div {\n\t\t\t\tbox-sizing: border-box;\n\t\t\t}\n\n\t\t\t.cascader-container:hover, .cascader-container.gray {\n\t\t\t\tborder-color: rgb(64, 150, 255);\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-value {\n\t\t\t\tmax-width: "+(n-10-12-15-10)+"px;\n\t\t\t\toverflow: hidden;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t}\n\n\t\t\t.cascader-container.gray .cascader-value {\n\t\t\t\tcolor: rgba(0, 0, 0, 0.25);\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-value.cascader-value-multiple {\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-wrap: wrap;\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-value.cascader-value-multiple > div {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: space-between;\n\t\t\t\talign-items: center;\n\t\t\t\twidth: "+(n-10-12-15-10)+"px;\n\t\t\t\tbackground-color: rgba(0, 0, 0, 0.06);\n\t\t\t\tborder-radius: 4px;\n\t\t\t\tmargin: 2px 0;\n\t\t\t\tpadding: 5px 6px;\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-value.cascader-value-multiple > div > div:first-child {\n\t\t\t\twidth: 88%;\n\t\t\t\tcolor: rgba(0, 0, 0, 0.88);\n\t\t\t\toverflow: hidden;\n\t\t\t\twhite-space: nowrap;\n\t\t\t\ttext-overflow: ellipsis;\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-value.cascader-value-multiple > div > div:last-child {\n\t\t\t\tcolor: rgba(0, 0, 0, 0.88);\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-menus {\n\t\t\t\tposition: absolute;\n\t\t\t\tleft: 0;\n\t\t\t\tdisplay: flex;\n\t\t\t\tvisibility: hidden;\n\t\t\t\tborder-radius: 6px;\n\t\t\t\tbox-shadow: 0 0 100px rgba(0, 0, 0, 0.08);\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-menus.active {\n\t\t\t\tvisibility: visible;\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-menus .cascader-menu {\n\t\t\t\tpadding: 3px;\n\t\t\t\tbackground: #fff;\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-menus .cascader-menu + .cascader-menu {\n\t\t\t\tborder-left: 1px solid rgba(5, 5, 5, 0.06);\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-menus .cascader-menu .cascader-menu-item {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: space-between;\n\t\t\t\talign-items: center;\n\t\t\t\theight: "+(void 0===i?35:i)+"px;\n\t\t\t\tborder-radius: 6px;\n\t\t\t\tpadding: 0 12px;\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item:hover {\n\t\t\t\tbackground: rgba(0, 0, 0, 0.06);\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item.disabled {\n\t\t\t\tcursor: default;\n\t\t\t\tcursor: not-allowed;\n\t\t\t\tcolor: rgba(0, 0, 0, 0.25);\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item.active {\n\t\t\t\tbackground: rgb(230, 244, 255);\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus-multiple\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item\n\t\t\t\t> div:first-child {\n\t\t\t\tdisplay: flex;\n\t\t\t\tjustify-content: center;\n\t\t\t\talign-items: center;\n\t\t\t\twidth: 18px;\n\t\t\t\theight: 18px;\n\t\t\t\tborder: 1px solid rgba(0, 0, 0, 0.25);\n\t\t\t\tborder-radius: 3px;\n\t\t\t\tmargin-right: 5px;\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus-multiple\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item\n\t\t\t\t> div:first-child div span {\n\t\t\t\tdisplay: none;\n\t\t\t\tfont-size: 12px;\n\t\t\t\tcolor: #fff;\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus-multiple\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item.multiple-active\n\t\t\t\t> div:first-child {\n\t\t\t\tbackground-color: #1677ff;\n\t\t\t\tborder-color: #1677ff;\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus-multiple\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item.multiple-active\n\t\t\t\t> div:first-child div span {\n\t\t\t\tdisplay: block;\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus-multiple\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item.multiple-active-half\n\t\t\t\t> div:first-child div {\n\t\t\t\twidth: 9px;\n\t\t\t\theight: 9px;\n\t\t\t\tbackground-color: #1677ff;\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item\n\t\t\t\t.cascader-menu-item-label {\n\t\t\t\twhite-space: nowrap;\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item\n\t\t\t\t> div:last-child {\n\t\t\t\tmargin-left: 10px;\n\t\t\t\tcolor: rgba(0, 0, 0, 0.45);\n\t\t\t}\n\n\t\t\t.cascader-container\n\t\t\t\t.cascader-menus\n\t\t\t\t.cascader-menu\n\t\t\t\t.cascader-menu-item.disabled\n\t\t\t\t> div:last-child {\n\t\t\t\tcolor: rgba(0, 0, 0, 0.25);\n\t\t\t}\n\n\t\t\t.cascader-container .cascader-arrow {\n\t\t\t\twidth: 0;\n\t\t\t\theight: 0;\n\t\t\t\tborder-left: 5px solid transparent;\n\t\t\t\tborder-right: 5px solid transparent;\n\t\t\t\tborder-top: 5px solid #000;\n\t\t\t}\n\n\t\t\t"+(t.showClear?".cascader-container .cascader-clear {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t\tfont-size: 14px;\n\t\t\t\t\tcolor: #bcbcbc;\n\t\t\t\t}\n\n\t\t\t\t.cascader-container:hover .cascader-arrow {\n\t\t\t\t\tdisplay: none;\n\t\t\t\t}\n\n\t\t\t\t.cascader-container:hover .cascader-clear {\n\t\t\t\t\tdisplay: flex;\n\t\t\t\t}":"")+"\n\t\t",l=document.createElement("style");l.type="text/css",l.styleSheet?l.styleSheet.cssText=s:l.appendChild(document.createTextNode(s)),document.head.appendChild(l)}function A(){c(this,p)[p](".cascader-container-"+c(this,l)[l],!0).classList.add("gray"),c(this,p)[p](".cascader-menus").classList.add("active")}function T(){c(this,p)[p](".cascader-container-"+c(this,l)[l],!0).classList.remove("gray"),c(this,p)[p](".cascader-menus").classList.remove("active")}function M(t){for(var e,n=c(this,d)[d].mode,r=void 0===n?"single":n,i='<div class="cascader-menu">',s=a(t);!(e=s()).done;){var l=e.value,o=l.className,u=l.label,v=l.value,p=l.disabled,m=l.children;i+='\n\t\t\t\t<div class="cascader-menu-item'+(o?" "+o:"")+(p?" disabled":"")+'"\n\t\t\t\t\t'+(l.showTitle?'title="'+u+'"':"")+'\n\t\t\t\t\tdata-label="'+u+'"\n\t\t\t\t\tdata-value="'+v+'"\n\t\t\t\t>\n\t\t\t\t\t'+("multiple"===r?"<div><div><span>&radic;</span></div></div>":"")+'\n\t\t\t\t\t<div class="cascader-menu-item-label">'+u+"</div>\n\t\t\t\t\t<div>"+(Array.isArray(m)?">":"")+"</div>\n\t\t\t\t</div>\n\t\t\t"}return i+="</div>"}function C(t){for(var e=[],n=t.parentNode.firstChild;n;)1===n.nodeType&&n!==t&&e.push(n),n=n.nextSibling;return e}function H(t){return Array.prototype.slice.call(t.parentNode.children).indexOf(t)}function V(t,e){for(var n,r=a(t);!(n=r()).done;){var i=n.value;if(i.value===e)return i;if(i.children&&i.children.length>0){var s=c(this,w)[w](i.children,e);if(s)return s}}return null}function q(){for(var t,e=a(c(this,m)[m](".cascader-menu-item"));!(t=e()).done;){t.value.classList.remove("multiple-active","multiple-active-half")}for(var n,r=a(c(this,o)[o]);!(n=r()).done;)for(var i=n.value,s=0;s<i.length;s++){var l=i[s],d=c(this,p)[p](".cascader-menu-item[data-value="+l+"]");d&&(s===i.length-1?d.classList.add("multiple-active"):d.classList.add("multiple-active-half"))}}function I(){var t=c(this,d)[d].displayRender,e="";if("function"==typeof t)for(var n=0;n<c(this,u)[u].length;n++){var a=c(this,u)[u][n],r=c(this,o)[o][n];e+="<div><div>"+t(a)+'</div><div class="cascader-multiple-value-del" data-link-list-value="'+r[r.length-1]+'">×</div></div>'}else for(var i=0;i<c(this,u)[u].length;i++){var s=c(this,u)[u][i],l=c(this,o)[o][i];e+="<div><div>"+s.join("/")+'</div><div class="cascader-multiple-value-del" data-link-list-value="'+l[l.length-1]+'">×</div></div>'}c(this,p)[p](".cascader-value").innerHTML=e}function z(){var t=this,e=c(this,p)[p](".cascader-container-"+c(this,l)[l],!0),n=c(this,p)[p](".cascader-menus"),r=c(this,d)[d],i=r.mode,h=void 0===i?"single":i,S=r.options,P=void 0===S?[]:S,L=r.displayRender;document.addEventListener("click",(function(n){var a=n.target;e.contains(a)||c(t,b)[b]()})),c(this,p)[p](c(this,s)[s],!0).addEventListener("click",(function(r){var i=r.target,s=e.contains(i),l=i.closest(".cascader-menu-item");if(l){var S;if(l.classList.contains("disabled"))return;var k=0!==r.pageX,E=l.dataset.value;l.classList.add("active");for(var A,T=a(c(t,g)[g](l));!(A=T()).done;){A.value.classList.remove("active")}for(var M=c(t,x)[x](l.parentNode),C=c(t,m)[m](".cascader-menu"),H=0;H<C.length;H++){var V=C[H];H>M&&n.removeChild(V)}var q=null==(S=c(t,w)[w](P,E))?void 0:S.children;if(q)n.insertAdjacentHTML("beforeend",c(t,y)[y](q));else{var I,z,N=[],R=[],_=c(t,m)[m](".cascader-menu-item.active");if("multiple"===h){var D=_[_.length-1].dataset.value,B=c(t,v)[v].findIndex((function(t){return t===D}));if(-1===B){for(var U,X=a(_);!(U=X()).done;){var $=U.value;N.push($.dataset.value),R.push($.dataset.label)}c(t,o)[o].push(N),c(t,u)[u].push(R),c(t,v)[v].push(D)}else c(t,o)[o].splice(B,1),c(t,u)[u].splice(B,1),c(t,v)[v].splice(B,1);c(t,O)[O]()}else{for(var F,G=a(_);!(F=G()).done;){var J=F.value;N.push(J.dataset.value),R.push(J.dataset.label)}c(t,o)[o]=N,c(t,u)[u]=R;var K="";K="function"==typeof L?L(c(t,u)[u]):c(t,u)[u].join("/"),c(t,p)[p](".cascader-value").innerHTML=K,c(t,b)[b]()}k&&(null==(I=(z=c(t,d)[d]).onChange)||I.call(z,c(t,o)[o],c(t,u)[u]))}return"multiple"===h&&c(t,j)[j](),!1}if(i.matches(".cascader-clear"))return t.reset(),!1;if(i.matches(".cascader-multiple-value-del")){for(var Q=i.dataset.linkListValue,W=c(t,v)[v].findIndex((function(t){return t===Q})),Y=0,Z=[c(t,o)[o],c(t,u)[u],c(t,v)[v]];Y<Z.length;Y++){Z[Y].splice(W,1)}return c(t,j)[j](),c(t,O)[O](),0===c(t,o)[o].length&&t.reset(),!1}s&&("single"===h&&t.setValue(c(t,o)[o]),c(t,f)[f]())}))}module.exports=P;
