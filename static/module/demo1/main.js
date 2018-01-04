/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
  'use strict';

  module.exports = app.View.extend({
    initialize:function () {
      console.log('demo1: 初始化组件');
    },
    events:{
      'touchstart .requestBtn': 'handlerName',
    },
    handlerName: function (e) {
      console.log('demo1: 点击了p');
      this.requestHandler();
    },
    requestHandler: function () {
      app.request({
        url: 'req_mock1',
        success: this.requestCallback.bind(this)
      });
    },
    requestCallback: function (result) {
      app.renderTpl('demo1Tpl', 'demo1_reqData', result);
    }
  });
});