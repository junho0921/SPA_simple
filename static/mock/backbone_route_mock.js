define(function (require) {
  require('backbone');
  var mockHandler = require('mock/main');
  // 启动拦截ajax的虚拟报文模式
  mockHandler();
  // 订阅backbone的路由事件来加载指定的业务的mock数据
  Backbone.history.on('route', function (router, name, args) {
    require(['mock/'+args[0]], function (mockData) {
      window._mock = mockData;
    });
  });
});