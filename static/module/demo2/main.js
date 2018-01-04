/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      console.log('demo2: 初始化组件');
    },
    events:{
      'touchstart .requestBtn': 'handlerName',
    },
    handlerName: function (e) {
      console.log('demo2: 点击了p');
      this.requestHandler();
    },
    requestHandler: function () {
      app.request({
        url: 'req_mock2',
        success: this.requestCallback.bind(this)
      });
    },
    requestCallback: function (result) {
      app.renderTpl('demo2Tpl', 'demo2_reqData', result);
    }
  });
});