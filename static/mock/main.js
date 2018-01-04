define(function () {
  window._mock = window._mock || {};
  function init () {
    /*嵌套测试*/
    function wrap (originalFuncName, wrapFunc){
      var ary = originalFuncName.split('.'),
        len = ary.length,
        funcName,
        context = window;
      ary.forEach(function (name, i) {
        if(i + 1 == len){
          funcName = name;
        }else{
          context = context[name]
        }
      });
      var ori = context[funcName];
      context[funcName] = function () {
        wrapFunc(arguments, ori, originalFuncName, context);
      }
    }

    function checkListToMock (data) {
      if(!data || window._stopMock){return false;}
      var mockList = Object.keys(window._mock);
      var url = data.url;
      console.warn('checkListToMock',mockList, data);
      return mockList.some(function (key) {
        // 匹配
        console.log('key', key, url, url.match(key));
        if(url.match(key)){
          var mockObj = window._mock[key];
          console.log('报文:',mockObj, mockObj.status, mockObj[mockObj.status]);
          var mockData = mockObj[mockObj.status];
          if(mockData){
            if($.isFunction(data.success)){
              data.success(mockData);
            }else if($.isFunction(data.callbackfn)){
              data.callbackfn(mockData)
            }
            return true;
          }
        }
      });
    }

    wrap('window.$.ajax', function (arg, next, originalFuncName, context) {
      var data = arg && arg[0];
      function defaultRun () {
        next.apply(context, arg);
      }
      if(checkListToMock(data)){
      }else{
        defaultRun();
      }
    });
  }
  return init;
});
