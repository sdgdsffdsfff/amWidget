/**
 *
 * AW loading
 * @namespace AW
 * @author 叶清 <yeqing@alipay.com>
 * @version 1.0.0
 *
 * */
;
(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) { // 兼容 CommonJS
        module.exports = factory();
    } else if (typeof define === 'function' && (define.amd || define.cmd)) { // 兼容 AMD / RequireJS
        define(factory);
    } else {
        root.AW = root.AW || {};
        AW.toast = factory();
    }
})(this, function () {
    'use strict';

    var toast = function(attrs){
        this._init.apply(this, arguments);
    };
    var ua = navigator.userAgent;

    toast.prototype = {
        /**
         * 默认配置参数
         *
         * @memberof AW.loading
         * @param {!Object} target - className，node对象
         * @param {!String} message - 默认文案
         * @param {String} type - 类型（success | error | loading）
         * @param {Number} hideDelay - 延迟隐藏时间（毫秒）
         * @param {Number} showDelay - 延迟显示时间（毫秒）
         * @param {String} animate - 动画效果
         * @param {Boolean} isWebview - 是否开启容器调用（开启后不在容器则不调用）
         *
         * @desc 默认配置参数
         *
         */
        attrs : {
            target: '.J-am-toast',
            message: '这里是默认文案，请添加',
            type: 'none',
            hideDelay: '2500',
            showDelay: '0',
            animate: 'none',
            isWebview: true
        },
        /**
         * 初始化
         *
         * @memberof AW.loading
         * @param {!Object} attr - 初始化参数
         *
         * @desc 初始化
         *
         */
        _init : function(attrs) {
            //初始化参数覆盖
            for(var p in attrs){
                this.attrs[p] = attrs[p];
            }

            //执行容器
            if(ua.indexOf('AlipayClient') > 0 && this.attrs.isWebview){
                this._setWebview(attrs);
                return true;
            }

            //设置message & type
            this._setTpl(attrs);
        },
        // 是否显示标识
        rendered : false,
        /**
         * 显示toast
         *
         * @memberof AW.loading
         *
         * @desc 外部调用
         *
         */
        show: function(){
            var _self = this;
            if (_self.rendered) return true;
            var el = document.querySelector(_self.attrs.target);
            //延迟显示
            window.setTimeout(function(){
                el.style.visibility = 'visible';
                _self.rendered = true;
                //延迟消失
                if(_self.attrs.hideDelay != 0){
                    window.setTimeout(function(){
                        _self.hide();
                    }, _self.attrs.hideDelay);
                }
            }, _self.attrs.showDelay);
        },
        /**
         * 隐藏toast
         *
         * @memberof AW.loading
         *
         * @desc 外部调用
         *
         */
        hide: function(){
            var _self = this;
            var el = document.querySelector(_self.attrs.target);
            el.style.visibility = 'hidden';
            _self.rendered = false;
        },
        /**
         * 设置toast模版
         *
         * @memberof AW.loading
         *
         * @desc 设置toast模版
         *
         */
        _setTpl : function (attrs) {
            var _self = this;
            var el = document.querySelector(_self.attrs.target);
            if (_self.attrs.type == 'success') { _self.attrs.type = 'right' }
            else if (_self.attrs.type == 'error') { _self.attrs.type = 'wrong' }
            el.innerHTML = '<div class="am-toast"><div class="am-toast-text">'
                + '<span class="am-icon-' + _self.attrs.type + '"></span> '
                + _self.attrs.message
                + '</div></div>'
        },
        //todo 依赖fx组件
        _animate : function(){
        },
        /**
         * 设置支付宝方法
         *
         * @memberof AW.loading
         *
         * @desc 设置支付宝方法
         *
         */
        _setWebview : function (attrs) {
            var _self = this;
            //执行容器loading
            if (_self.attrs.type == 'loading') {
                AlipayJSBridge.call('showLoading', {
                    text: _self.attrs.message,
                    delay: _self.attrs.showDelay
                });
            }
            //容器toast（success & fail）
            else if (_self.attrs.type == 'success' || _self.attrs.type == 'error') {
                //fix 容器参数不同
                if (_self.attrs.type == 'error') _self.attrs.type = 'fail';
                //执行容器toast
                AlipayJSBridge.call('toast', {
                    content: _self.attrs.message,
                    type: _self.attrs.type,
                    duration: _self.attrs.hideDelay
                });
            };
        }
    };
    return toast;
});