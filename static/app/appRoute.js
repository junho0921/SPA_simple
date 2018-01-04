/**
 * Created by jun.ho.
 */
define(function (require, exports, module) {
	'use strict';
	module.exports = Backbone.Router.extend({
		initialize: function () {
			this.route(":dir", "handle");
		},
		handle: function (dir) {
			var _this = this;
      if(dir == 'home'){
      	window.location.hash = '';
        window.location.reload();
			}
      require([
				// 并联的异步获取三个文件
				'text!module/' + dir + '/index.html',
				'style!module/' + dir + '/main.css',
				'module/' + dir + '/main'
			], function (html, css, PageModule) {
				// 提供触发切换页面的事件
				_this.trigger('onNavigateNewPage', dir);

				app.container
					.off()          // 清理绑定事件
					.empty()        // 清理内容
					.append(html);  // 渲染新html
				// todo 还没有好
				app.container.scrollTop(0);
				return new PageModule();
			});
		}
	});
});