/**
 * Created by jun.ho
 */
define(function (require, exports, module) {
	'use strict';
  require('undescore');
	var $e = $('#appContainer');

	module.exports = {
		renderTpl: function (tplId, containerId, datas, show) {
			var tpl = _.template($e.find('#'+ tplId).html());
			var tplHtml = tpl(datas);
			$e.find('#' + containerId).html(tplHtml);
		},
		/*
		* 本地存储的方法
		* */
		savePageData: function (name, data) {
			if(data === undefined){
				data = name;
				name = window.location.hash || 'noName';
			}
			sessionStorage.setItem(name, JSON.stringify(data));
		},
		getPageData: function (name) {
			name = name || window.location.hash || 'noName';
			var data = sessionStorage.getItem(name);
			try{
				data = JSON.parse(data)
			}catch (e){
				console.log('parse LocalData错误', e);
			}
			return data;
		}
	};
});