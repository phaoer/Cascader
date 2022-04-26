;
!(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.Cascader = factory());
}(this, (function () {
  var Cascader = function (option) {
    this.option = option;
    this.selectedValue = '';
    this.selectedData = [];
    this.width = this.option.width && 228;
    var that = this;

    document.querySelector('body').addEventListener('click', function (e) {
      var ele = e.target;
      if (ele.classList.contains('cascader-icon') || ele.classList.contains('cascader-selected')) {
        if (document.querySelector('.cascader-box').classList.contains('content-show')) {
          hideCascader();
        } else {
          showCascader();
        }

        e.stopPropagation();
      } else if (ele.classList.contains('cascader-content-item')) {
        var ele = e.target;
        var rank = ele.getAttribute('torank');
        var tag = ele.getAttribute('totag');
        var activeContent = document.querySelector('.cascader-content[tag="' + tag + '"]');
        var dataTemp = option.data.concat([]);
        var selectedArr = tag.split('-');

        for (var i = 0; i < document.querySelectorAll('.cascader-content').length; i++) { //隐藏大于等于当前等级的列表框 消除选中的项目
          var element = document.querySelectorAll('.cascader-content')[i];
          if (element.getAttribute('rank') >= rank) {
            element.classList.remove('content-show');
            for (var j = 0; j < element.children.length; j++) {
              element.children[j].classList.remove('cascader-content-item-click');
            }
          }
        }

        for(var k = 0; k < ele.parentElement.children.length; k++) {
          ele.parentElement.children[k].classList.remove('cascader-content-item-click');
        }
        ele.classList.add('cascader-content-item-click'); //选中效果

        if (activeContent) { //有下级显示下级
          activeContent.classList.add('content-show');
        } else {
          that.selectedValue = '';
          that.selectedData = [];
          for (var i = 0; i < selectedArr.length; i++) {
            that.selectedValue += dataTemp[selectedArr[i]].value + '/';
            that.selectedData.push(dataTemp[selectedArr[i]]);
            dataTemp = dataTemp[selectedArr[i]].child || null;
          }
          that.selectedValue = that.selectedValue.substr(0, that.selectedValue.length - 1);

          document.querySelector('.cascader-selected').innerHTML = that.selectedValue;
          hideCascader();

          option.callback && option.callback(that.current());
        }

        e.stopPropagation();
      } else {
        hideCascader();
      }
    });

    function showCascader() {
      for (var index = 0; index < that.selectedData.length; index++) {
        var element = that.selectedData[index];
        document.querySelector('.cascader-content-item[title="' + element.value + '"]').classList.add('cascader-content-item-click');

        var parent = document.querySelector('.cascader-content-item[title="' + element.value + '"]').parentElement;
        parent.classList.add('content-show');
      }

      document.querySelector('.cascader-icon').classList.add('cascader-icon-active');
      document.querySelector('.cascader-box').classList.add('content-show');
    }

    function hideCascader() {
      document.querySelector('.cascader-icon').classList.remove('cascader-icon-active');
      document.querySelector('.cascader-box').classList.remove('content-show');

      for (var i = 0; i < document.querySelectorAll('.cascader-content').length; i++) {
        document.querySelectorAll('.cascader-content')[i].classList.remove('content-show');
        
      }

      for (var j = 0; j < document.querySelectorAll('.cascader-content-item').length; j++) {
        document.querySelectorAll('.cascader-content-item')[j].classList.remove('cascader-content-item-click');
        
      }
    }
  };

  Cascader.prototype.init = function () {
    var data = Object.prototype.toString.call(this.option.data) === '[object Array]' ? this.option.data : [];
    var dataTemp = data.concat([]);

    var html = '<div class="cascader" style="width: ' + this.width + 'px;">' +
      '<div class="cascader-selected" style="width: ' + (this.width - 28) + 'px"></div>' +
      '<a class="cascader-icon" href="javascript:;"></a><div class="cascader-box">' + render.call(this, data, 1) + '</div></div>';
    
    injectCss();
    document.querySelector(this.option.container).innerHTML = html;

    if(this.option.defaultValue && typeof this.option.defaultValue === "string" && this.option.defaultValue.indexOf("/") > -1) {
      this.selectedValue = this.option.defaultValue;

      for (var i = 0; i < this.selectedValue.split("/").length; i++) {
        var ii = this.selectedValue.split("/")[i];
        for (var j = 0; j < dataTemp.length; j++) {
          var jj = dataTemp[j];
          if(ii === jj.value) {
            this.selectedData.push(jj);
            dataTemp = jj.child || null;
            break;
          }
        }
      }

      document.querySelector('.cascader-selected').innerHTML = this.selectedValue;
    } else if(this.option.defaultValue && Object.prototype.toString.call(this.option.defaultValue) === "[object Array]") {
      for (var i = 0; i < this.option.defaultValue.length; i++) {
        var ii = this.option.defaultValue[i];
        this.selectedData.push(dataTemp[ii]);
        this.selectedValue += dataTemp[ii].value + '/';
        dataTemp = dataTemp[ii].child || null;
      }

      this.selectedValue = this.selectedValue.substr(0, this.selectedValue.length - 1);

      document.querySelector('.cascader-selected').innerHTML = this.selectedValue;
    }

    function render(data, rank, tag) {
      console.log(this);
      var html = '<div class="cascader-content" rank=' + rank + ' tag=' + (tag || 'parent') + ' style="width: ' + this.width + 'px; left: ' + ((rank - 1) * this.width) + 'px">';

      var temp = {};
      for (var i = 0; i < data.length; i++) {
        var element = data[i];
        var nextTag = tag ? tag + "-" + i : i;
        html += '<div class="cascader-content-item ' + (element.className || '') + '" title=' + element.value + ' torank=' + (rank + 1) + ' totag=' + nextTag + '>' + element.value + (element.child ? '<span>></span>' : '') + '</div>';

        if (Object.prototype.toString.call(element.child) === '[object Array]') {
          temp[nextTag] = element.child;
        }
      }
      html += '</div>';

      if (Object.keys(temp).length) {
        for (var attr in temp) {
          html += render.call(this, temp[attr], rank + 1, attr);
        }
      }

      return html;
    }

    function injectCss () {
      var head = document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.cascader {height:28px;line-height:28px;position:relative;z-index:1;margin:auto;cursor:pointer;}.cascader-selected {height:100%;padding:0 5px;text-align:center;background-color:#3E3C51;color:#B4B2C3;box-sizing:border-box;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}.cascader-icon {display:block;width:28px;height:28px;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAcCAYAAAD/YJjAAAACgUlEQVRoge2YzW6bQBDHhw8b/EFyyCEB1rSRem2veZeqz9Bn6INWckUAY6mcwAHbwa5mwK6bCIydiS/dn2Sthh32n/1lQU6Ub1+/b+GC3Ny4l4yDJAkvmqdeNO0/QAplRgplRgplRgplRgplRgplRgplRgpl5iyh/X4fPO8jjZegyvPY8waDIdze2p16sQ/7j3Gy0H7fACE+gGmYIIRH9XuCEoUQdZ5gk6ooKti2A9dX12DfuaAoSkOfArbt1n0O3dfGSUINw4SJ8EDXNCg3G9A1nWrDeB+puO5ETCin3JR13oQlb7vdQBSFtA/LsuCOZP0rFWu8bo0t6otmId3XRmehKFO4E9A0DRZPC5hOf9KItXA9mucEpQlXHORND/IEi9SiyCEM/Urq2KKTuJO6O5k7mdiH/cfoJNQ0q8cbN5MtMoiiADb4G4sCqmmTwqM+Dqo8cZAX1XnRQZ5gySuKAoLAh7IsYTwag+MIUFWVRqzxOs5jXxeOCjXNAbiuB5qqQpqlMKNjX/3HD0es8TrOYx/2vwWU5LouaKpW581e5M3qPI36OKQulwUE4SPJGw1HcH//iUaSGfo035VWofgCdhy3kpmmEMfRfnM7sMbrO6kOPTbnfRvDx8xxnEom5cUNefFeqmO/fvedA0p7DHx4Lkvax3P5TPVyuTxpNe3L54cfzdPb/VGP51HrQlmWgt7rQZL8hvV61dg3HF61rvM3Lz6Sl4He0yFJEliv1419eZ62rnMInsjFIgNzMKDX2WrVvI8m9GMNef5Eny7M57OTf4DXeTl9uuXN35z3EpTo+7/Ovl/+pcSMFMqMFMqMFMqMFMqMFMqMFMqMFMqMFMoJAPwBppknOva7ILEAAAAASUVORK5CYII=) left top no-repeat;position:absolute;top:0;right:0;}.cascader-icon:not(.cascader-icon-active):hover {background-position:-28px 0;}.cascader-icon-active {background-position:-56px 0;}.cascader-box {display:none;}.cascader-content {position:absolute;left:0;top:32px;height:120px;background-color:#3E3C51;overflow-y:auto;display:none;}.cascader-content[tag="parent"] {display:block;}.cascader-content::-webkit-scrollbar {width:5px;}.cascader-content::-webkit-scrollbar-thumb {background:#706D86;}.cascader-content::-webkit-scrollbar-track {border-radius:0;background:transparent;}.cascader-content-item {position:relative;height:30px;line-height:30px;padding:0 36px 0 10px;box-sizing:border-box;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;color:#B4B2C3;}.cascader-content-item span {position:absolute;top:0;right:15px;font-size:14px;}.cascader-content-item:hover,.cascader-content-item-click {background-color:#504E63;color:#AFA7FF;}.content-show {display:block;}';

      head.appendChild(style);
    }
  };

  Cascader.prototype.current = function () {
    return {
      value: this.selectedValue,
      data: this.selectedData
    };
  };

  Cascader.prototype.reset = function () {
    this.selectedValue = '';
    this.selectedData = [];
    document.querySelector('.cascader-selected').innerHTML = '';
  };

  return Cascader;
})));
