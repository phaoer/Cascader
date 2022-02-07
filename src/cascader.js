(function (win) {
  'use strict';
  var Cascader = function (option) {
    if(!$){
      console.warn('load jQuery first please');
      return false;
    }

    this.selectedValue = '';
    this.selectedData = [];
    var that = this;
    $('body').on('click', function (e) {
      hideCascader();
    }).on('click', '.cascader', function (e) {
      if($('.cascader-box').hasClass('content-show')){
        hideCascader();
      } else {
        showCascader();
      }
      e.stopPropagation();
    }).on('click', '.cascader-content-item', function (e) {
      var ele = $(this);
      var rank = $(this).attr('torank');
      var tag = $(this).attr('totag');
      var activeContent = $('.cascader-content[tag=' + tag + ']');
      var dataTemp = option.data;
      var selectedArr = tag.split('-');

      for (var index = 0; index < $('.cascader-content').length; index++) {      //隐藏大于等于当前等级的列表框 消除选中的项目
        var element = $('.cascader-content').eq(index);
        if (element.attr('rank') >= rank) {
          element.removeClass('content-show').find('.cascader-content-item').removeClass('cascader-content-item-click');
        }
      }

      ele.addClass('cascader-content-item-click').siblings().removeClass('cascader-content-item-click');       //选中效果

      if (activeContent.length) {        //有下级显示下级
        activeContent.addClass('content-show').css({
          left: (rank - 1) * (that.option.width || 228)
        });
      } else {
        that.selectedValue = '';
        that.selectedData = [];
        for (var i = 0; i < selectedArr.length; i++) {
          that.selectedValue += dataTemp[selectedArr[i]].value + '/';
          that.selectedData.push(dataTemp[selectedArr[i]]);
          dataTemp = dataTemp[selectedArr[i]].child || null;
        }
        that.selectedValue = that.selectedValue.substr(0, that.selectedValue.length - 1);
        $('.cascader-selected').html(that.selectedValue);
        hideCascader();

        option.callback && option.callback(that.current());
      }

      e.stopPropagation();
    });

    this.option = option;

    function showCascader(){
      for (var index = 0; index < that.selectedData.length; index++) {
        var element = that.selectedData[index];
        $('.cascader-content-item[title=' + element.value + ']').addClass('cascader-content-item-click').parent().addClass('content-show');
      }

      $('.cascader-icon').addClass('cascader-icon-active');
      $('.cascader-box').addClass('content-show');
    }

    function hideCascader(){
      $('.cascader-icon').removeClass('cascader-icon-active');
      $('.cascader-box').removeClass('content-show');
      $('.cascader-content').removeClass('content-show');
      $('.cascader-content-item').removeClass('cascader-content-item-click');
    }
  };

  Cascader.prototype.init = function () {
    var data = Object.prototype.toString.call(this.option.data) === '[object Array]' ? this.option.data : [];

    var html = '<div class="cascader" ' + (this.option.width ? 'style="width: ' + this.option.width + 'px"' : '') + '>' +
      '<div class="cascader-selected" ' + (this.option.width ? 'style="width: ' + (this.option.width - 28) + 'px"' : '') + '></div>' +
      '<a class="cascader-icon" href="javascript:;"></a><div class="cascader-box">' + render(data, 1) + '</div></div>';

    $(this.option.container).html(html);

    this.option.width && $('.cascader-content').css({
      width: this.option.width
    });

    function render(data, rank, tag) {
      var html = '<div class="cascader-content" rank=' + rank + ' tag=' + (tag || 'parent') + '>';

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
          html += render(temp[attr], rank + 1, attr);
        }
      }

      return html;
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
    $('.cascader-selected').html('');
  };

  win.Cascader = Cascader;
})(window);
