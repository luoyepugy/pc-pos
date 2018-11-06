/* RESTFUL APIs
    - 包含跟服务器交互的常用方法
    @param path 请求的url
    @param data 前端传递给后台的数据对象
    @param params 查询对象，将被parse成类似"?a=1&b=2"的形式拼在path后面
   共包含五种方法：
    Rest#post     - 增
    Rest#delete   - 删
    Rest#put      - 改
    Rest#get      - 查
    Rest#upload   - 上传

   Usage:
    var rest = require('rest');

    rest.post('user/new', {
      name: 'jacket',
      position: 'Frontend Developer'
    }).done(function (res) {
      // Do something...
    });
*/
import Vue from 'vue'
import { helper } from './helper'
import $ from 'jquery'
// import App from './main'
// import Message from './components/iview/message'

function Rest() {}

Rest.prototype = {
  // 增 - POST
  post: function(path, data, params) {
    if (params) path = parse(path, params)
    return doAjax('POST', path, data)
  },
  // 删 - DELETE
  delete: function(path, params) {
    if (params) path = parse(path, params)
    return doAjax('DELETE', path)
  },
  // 改 - PUT
  put: function(path, data, params) {
    if (params) path = parse(path, params)
    return doAjax('PUT', path, data)
  },
  // 查 - GET
  get: function(path, params) {
    if (params) path = parse(path, params);
    return doAjax('GET', path)
  },
  // 上传 - POST
  upload: function(path, data, params) {
    if (params) path = parse(path, params)
    return uploadHelper(path, data)
  },
  // 上传 - POST
  download: function(path, params, callback) {
    if (params) path = parse(path, params)
    return downloadHelper(path, params, callback)
  },
  //单独为login登录
  post_login: function(path, data) {
    return doAjax('POST', path, data, '', '', true)
  },
}

/* 格式化请求路径
    @param path 请求路径
    @param params 查询对象或字符串
  Usage:
    parse('user/query', '?name=j&age=21')
    or
    parse('user/query', { name: 'j', age: '21' })
  将输出：'user/query?name=j&age=21'
    parse('user/:userId/info/:infoId', { userId: 1, infoId: 2 })
  将输出：'user/1/info/2'
*/
function parse(path, params) {
  if (path.charAt(path.length - 1) === '/') path = path.substr(0, path.length - 1)
  if (helper.isString(params)) return path + '/' + params
  if (helper.isNumber(params)) return path + '/' + params
  if (helper.isObject(params)) {
    if (/:[a-zA-Z]+/.test(path)) {
      for (var key in params) {
        path = path.replace(new RegExp(':' + key, 'g'), params[key])
      }
    } else {
      var search = '?'
      if (path.indexOf('?') > -1) {
        search = '&'
      }
      var counter = 0
      for (var key in params) {
        if (counter) search += '&'
        search += key + '=' + params[key]
        counter++
      }
      return path + search
    }
  }
  return path
}

function doAjax(type, path, data, contentType, dataType, isXhrFields) {
  var setting = apiSetting(type, path, contentType, dataType, isXhrFields)
  if (data) {
    if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put') data = JSON.stringify(data)
    setting['data'] = data
    // setting['data'] = JSON.stringify(data)
  }
  return $.ajax(setting)
}

function uploadHelper(path, data) {
  var setting = apiSetting('POST', path)
  setting['data'] = data
  setting['contentType'] = false
  setting['processData'] = false
  return $.ajax(setting)
}

function downloadHelper(path, data, callback) {
  var fullUrl = getFullUrl(path)
  // var fullUrl = baseUrl + path
  callback && callback(fullUrl);
}

function getFullUrl(path) {
  let key = (path.split(':').length > 1) ? path.split(':')[0] : 'common',
    url = (path.split(':').length > 1) ? path.split(':')[1] : path;
  switch (key) {
    case 'system':
      return __SYSTEMAPI__ + url;
    default:
      return __COMMONAPI__ + url;
  }
}

function apiSetting(type, path, contentType, dataType, isXhrFields) {
  isXhrFields = isXhrFields || false;
  var fullUrl = getFullUrl(path);
  // var fullUrl = baseUrl + path
  var setting = {
    cache: false,
    url: fullUrl,
    type: type,
    contentType: 'application/json',
    dataType: 'json',
    // contentType: contentType || 'application/x-www-form-urlencoded',
    // dataType: dataType || 'json',
    timeout: 1000 * 60,
    //crossDomain: true,
    // xhrFields: {
    //   withCredentials: true
    // },
    beforeSend: function(xhr) {
      // $('#processing').removeClass('hide');
    },
    complete: function(xhr) {
      // $('#processing').addClass('hide');
    },
    success: function(res) {
      if (res.status.code === '401') {
        location.hash = '/login'
      }
    },
    error: function(xhr, textStatus) {
      if (xhr.status === 404) {
        Vue.prototype.$Message.error('请求404，可能是网络问题！')
      } else if (xhr.status === 500) {
        Vue.prototype.$Message.error('网络出现问题！')
      } else if (xhr.status === 0) {

      } else if (textStatus === 'parsererror') {

      } else if (textStatus === 'timeout') {
        Vue.prototype.$Message.warning('请求超时，请后退重新进入！')
      } else {

      }
    }
  };
  if (isXhrFields) {
    setting.xhrFields = { withCredentials: true };
    delete setting.crossDomain;
  } else {
    setting.crossDomain = true;
    delete setting.xhrFields;
  }
  if (helper.get('token') && helper.get('token') !== 'null') {
    if (!setting['headers']) setting['headers'] = {}
    setting['headers']['X-Token'] = helper.get('token')
  }
  return setting;
}

const rest = new Rest()

export default rest