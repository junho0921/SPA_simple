/**
 * Created by jun.ho
 */
define(function (require) {
    'use strict';

    var template = require('text!module/appHeader/index.html');
    return Backbone.View.extend({
        el: $('#appHeader')[0],
        initialize:function () {
            this.$el.html(template);
        },
        /*
        * 外部方法:
        * */
        toggle: function (bool) {
            this.$el.toggle(bool);
        },
        activePageIndex: function (pageName) {
            this.$el.find('.appLink').removeClass('active');
            this.$el.find('[data-link='+pageName+']').addClass('active');
        }
    });
});

