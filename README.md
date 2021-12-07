# Cascader
cascader for javascript and **base on jquery**

## Introduction
> This is a small component removed from daily development. There are many imperfections. Please use it with caution

## Usage

```javascript
  <link type="text/css" rel="stylesheet" href="dist/css/cascader.min.css">
  ...
  <script type="text/javascript" src="https://cdn.staticfile.org/jquery/1.11.1/jquery.min.js"></script>
  <script type="text/javascript" src="dist/js/cascader.min.js"></script>
  <script>
  var cascader = new Cascader({
      container: 'body',       // => $(container).html()
      width: 228,			  // cascader's width
      callback: function (data) {      // selected value callback
        // {
        //   data: [{className: 'sichuan', value: '四川省', child: Array(1)}, {className: 'chengdu', value: '成都市', child: Array(6)}, {className: '', value: '高新区'}],
        //   value: "四川省/成都市/高新区"
        // }
        console.log(data);
      },
      data: [{
        className: 'sichuan',        // If the value is not empty, it will be set to class
        value: '四川省',             // value and html title
        child: [{
          className: 'chengdu',
          value: '成都市',
          child: [{
            className: '',
            value: '金牛区',
          }, {
            className: '',
            value: '成华区',
          }, {
            className: '',
            value: '锦江区',
          }, {
            className: '',
            value: '高新区',
          }, {
            className: '',
            value: '青羊区',
          }, {
            className: '',
            value: '武侯区',
          }]
        }]
      }, {
        className: 'yunnan',
        value: '云南省',
        child: [{
          className: '',
          value: '丽江市',
          child: [{
            className: '',
            value: '古城区',
          }]
        }]
      }, {
        className: 'jiangsu',
        value: '江苏省',
        child: [{
          className: '',
          value: '南京市'
        }]
      }, {
        className: 'guangdong',
        value: '广东省',
        child: [{
          className: '',
          value: '广州市',
          child: [{
            className: '',
            value: '荔湾区'
          }, {
            className: '',
            value: '越秀区'
          }]
        }, {
          className: '',
          value: '深圳市',
          child: [{
            className: '',
            value: '南山区'
          }, {
            className: '',
            value: '光明区'
          }]
        }]
      }, {
        className: 'ningxia',
        value: '广西壮族自治区',
        child: [{
          className: '',
          value: '南宁市'
        }]
      }]
    });

    cascader.init();      // init
  </script>

```