/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
	'use strict';

	var AppRoute = require('app/appRoute');
	var $container = $('#appContainer');
	var tools = require('tools');
	var AppHeader = require('appHeader');

	// 初始化全局的应用管理对象app
	window.app =
		window.app || {
			/*DOM*/
			page: $('body'),
			container: $container,
			/*全局缓存*/
			global: {},
			/*工具*/
			utils: tools,
			renderTpl : tools.renderTpl,
			controlSongs : tools.controlSongs,
			/*视图类型*/
			View: Backbone.View.extend({el: $container})
		};

	module.exports = {
		init: function () {
			// 初始化头部
      new AppHeader();
      // 导航/路由方法
      app.navigate = (new AppRoute()).navigate;
			// 请求方法
      var requestCount = 0;
      app.request = function (obj, toSaveLocalData) {
				// loading效果
				obj.always = function () {
					if (!--requestCount) {
						app.container.removeClass('loading');
					}
				};
				if(toSaveLocalData === 'savePageData'){app.utils.savePageData(obj.data);}
				app.container.addClass('loading');
				requestCount++;
				// 伴奏客户端的大部分接口都是使用post请求方法
				return $.ajax(obj);
			};
			// 绑定点击路由按钮所触发的路由事件
      app.page.on('touchstart', '.appLink', function (e) {
        var pageName = $(this).attr('data-link'),
          hashName = '#' + pageName;
        // 清理缓存
        app.utils.savePageData(hashName, '');
        app.navigate(pageName, true);
      });

			/*开启路由管理*/
			Backbone.history.start();
		}
	};
});