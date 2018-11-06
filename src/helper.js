export const helper = {

  /* 判断 obj 是否为 null
       Usage:
         var obj = null
         helper.isNull(obj) // 输出 true
    */
  isNull: function(obj) {
    return obj === null || obj === undefined || obj === "" || obj !== obj;
  },

  /* 判断 obj 是否为 function
     Usage:
       var obj = 'abc'
       helper.isFunction(obj) // 输出 false
  */
  isFunction: isType('Function'),

  /* 判断 obj 是否为 object
     Usage:
       var obj = {}
       helper.isObject(obj) // 输出 true
  */
  isObject: isType('Object'),

  /* 判断 obj 是否为 array
     Usage:
       var obj = ['abc']
       helper.isArray(obj) // 输出 true
  */
  isArray: window.isArray || isType('Array'),

  /* 判断 obj 是否为 string
     Usage:
       var obj = 'abc'
       helper.isString(obj) // 输出 true
  */
  isString: isType('String'),

  /* 判断 obj 是否为 undefined
     Usage:
       var obj = 'abc'
       helper.isUndefined(obj) // 输出 false
  */
  isNumber: isType('Number'),
  /* 判断 obj 是否为 Number
     Usage:
       var obj = 123
       helper.isUndefined(obj) // 输出 true
  */
  isUndefined: isType('Undefined'),
  // 获取 Cookie
  getCookie: getCookie,
  /* 判断请求是否成功
      @param res `Object` 后台返回的response对象
     Usage:
      helper.isSuccess(res)
  */
  isSuccess: function(res) {
    return Number(res.status.code) === 0
  },

  /* 获取浏览器存储里key为item的值
        @param item 要获取的数据的索引值
       Usage:
         helper.get('token')
    */
  get: function(item) {
    var value
    if (this.storage) {
      value = this.storage.getItem(item)
    } else {
      value = getCookie(item)
    }

    return (value ? this.decrypt(value) : '')
  },

  fieldMapping: function(target, array) {
    let result = [],
      strArr = helper.isArray(target) ? target : [].concat(target);
    for (let i of array) {
      if (~strArr.indexOf(i.Id)) {
        result.push(i.name);
      }
    };
    return result.join(',');
  },

  formatDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
  },


}

function isType(type) {
  return function(obj) {
    return {}.toString.call(obj) === '[object ' + type + ']'
  }
}

/* 获取 Cookie 值
 */
function getCookie(name) {
  var c = document.cookie
  if (c.length > 0) {
    var s = c.indexOf(name + '=')
    if (s !== -1) {
      s = s + name.length + 1
      var e = c.indexOf('', s)
      return unescape(c.substring(s, e))
    }
  }
  return ''
}

/**
 * 图表echarts统一依赖，避免多次打包
 * @param key
 * @return {*}
 */
export const echarts = function(resolve) {
  require(['echarts/lib/echarts', 'echarts/lib/chart/bar', 'echarts/chart/pie', 'echarts/lib/chart/line', 'echarts/lib/component/tooltip', 'echarts/lib/component/legend', 'echarts/lib/component/title'], resolve);
};