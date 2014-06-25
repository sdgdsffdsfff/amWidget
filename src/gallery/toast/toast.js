/**
 *
 * AW toast
 * @namespace AW
 * @author 叶清 <yeqing@alipay.com>
 * @version 1.0.0
 * @example toast('您的资金已经成功转入！');
 *
 * */

 var _toastSetup = {
    /**
     * @description 默认配置参数
     *
     * @param {String} message - 默认文案
     * @param {String} type - 类型（none | success | error）
     * @param {String} hideDelay - 延迟隐藏时间（毫秒）
     * @param {Boolean} callContainer - 是否开启容器native调用
     *
     * @desc 默认配置参数
     *
     */
    options : {
        'message': '',
        'type': 'none',
        'hideDelay': '2500',
        'callContainer': true
    },
    /**
     * @description 初始化
     *
     * @param {String|Object} options - 默认调用参数
     *
     */
    init : function(options) {
        //初始化参数覆盖
        for(var p in options){
            this.options[p] = options[p];
        }

        //是否开启容器，是否在容器内，是否有容器方法，是否有权限
        if(this.options.callContainer && navigator.userAgent.indexOf('AlipayClient') >= 0){
            this.callBridge.call('checkJSAPI', {
                api: 'toast'
            }, function (result) {
                if(result.available) {
                    this.callContainer();
                }
            });
        } else {
            this.setCSS();
            this.setHTML();
            this.show();
        }
    },
    /**
     * @description 默认提供CSS
     *
     */
    CSStext : '.am-toast{position:fixed;z-index:100;top:45%;width:100%;text-align:center;font-size:16px;font-family:sans-serif;}.am-toast .am-toast-text{display:inline-block;margin:-24px auto auto;padding:9px 20px;border-top-left-radius:5px;border-top-right-radius:5px;border-bottom-left-radius:5px;border-bottom-right-radius:5px;-webkit-background-clip:padding-box;color:#FFF;background-color:rgba(0,0,0,0.8);}.am-toast .am-toast-text .iconfont{font-size:16px;}.am-toast-show{display:block;}.am-toast-hide{display:none;}.am-toast .am-icon-error,.am-toast .am-icon-success{display:inline-block;height:15px;vertical-align:middle;}.am-toast .am-icon-error:before,.am-toast .am-icon-success:before{content:"";display:block;width:100%;height:100%;background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAUCAYAAADLP76nAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyQzM4RDk3M0NEMzkxMUUzOTA5QkQ5NjEwMTU4QkI2MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyQzM4RDk3NENEMzkxMUUzOTA5QkQ5NjEwMTU4QkI2MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJDMzhEOTcxQ0QzOTExRTM5MDlCRDk2MTAxNThCQjYwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJDMzhEOTcyQ0QzOTExRTM5MDlCRDk2MTAxNThCQjYwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+wRxj8gAAAclJREFUeNrEl79KxEAQxnPnO9gJhwgWiiDKgeIf0HdI7OysLA4ULxbqNVd4gmBhJVrY6UP4AL6BIIp4WFxQVLSTi9/iHKzrJNnZcHHgl4RkJvt9kOzsluI49ijq4B5cerLwQQW0vP8IZQCE8U98AZ/u2eBTjYq6oE7KAFij869nHg2sh60JXXwvtvogvgRO6f3npgl1WGGEZJnwE2qCPog/McY5A2XdgNREkeKP479xCwZNA7YmihR/xIi/A0PmJ2RroijxikNG/AOocD+xrQmp+Bo4cBDfYsQ/gmEuP+klnAmJ+HXQpdymQHyTGasNRpJq0l4WJJjIEr+qie9Fw0J8gxnrCYym1ZXTepzjs2sQGff2wG5KzQ7l6NEBy+DGphPbTJWSPjEGOkxdyOSGTJ6qHbf57CRNStrsJkDEiNvUcjaY5xHVei4GgpTZJnAwMQmeGZE1wowXqvFcDAQWU6WLiSnwatR0mR9d5UxLp12J+DwmqowJU3zVpelJxecxMQPeGPHvYNa1a3OzgO3ygDORtSeYAx9avrqez7Ps6F1sO65tdBOhZc0C+CQW866bStqWMqQt5YVwUxfQlnJfULNE56u8O8pvAQYAUnCy4ged31IAAAAASUVORK5CYII=") no-repeat;-webkit-background-size:32px auto;}.am-toast .am-icon-error{width:13px;}.am-toast .am-icon-error:before{background-position:0 0;}.am-toast .am-icon-success{width:16px;}.am-toast .am-icon-success:before{background-position:-14px 0;}',
    /**
     * @description 是否第一次设置CSS
     *
     */
    isSetCSS : false,
    /**
     * @description 设置CSS
     *
     */
    setCSS : function() {
        var that = this;
        if(that.isSetCSS) {
            document.querySelector("style[data-amwid=toast]").innerHTML = this.CSStext;
        } else {
            var style = document.createElement('style');
            style.dataset.amwid = 'toast';
            style.innerHTML = this.CSStext;
            document.head.appendChild(style);
            that.isSetCSS = true;
        };
    },
    /**
     * @description 默认提供HTML模版
     *
     */
    HTMLtext: '<div class="am-toast-text"><span class="am-icon-<%toast-type%>"></span> <%toast-message%></div>',
    /**
     * @description 是否第一次设置HTML
     *
     */
    isSetHTML : false,
    /**
     * @description 设置HTML
     *
     */
    setHTML : function() {
        var HTMLtext = this.HTMLtext.replace('<%toast-type%>', this.options.type);
            HTMLtext = HTMLtext.replace('<%toast-message%>', this.options.message);
        if(this.isSetHTML) {
            this.toastDom.innerHTML = HTMLtext;
        } else {
            var toastDom = document.createElement('div');
            toastDom.className = 'am-toast am-toast-hide';
            toastDom.innerHTML = HTMLtext;
            this.toastDom = toastDom;
            document.body.appendChild(toastDom);
            this.isSetHTML = true;
        }
    },
    /**
     * @description 显示toast
     *
     */
    show : function() {
        var that = this;
        this.hide();
        that.toastDom.classList.remove('am-toast-hide');
        that.toastDom.classList.add('am-toast-show');
        that.hideDelay();
    },
    /**
     * @description 隐藏toast
     *
     */
    hide : function() {
        if(this.toastDom) {
            this.toastDom.classList.remove('am-toast-show');
            this.toastDom.classList.add('am-toast-hide');
        }
    },
    /**
     * @description 延时隐藏toast
     *
     */
    hideDelay : function() {
        var that = this;
        if(that.options.hideDelay != 0){
            window.setTimeout(function(){
                that.hide();
            }, that.options.hideDelay);
        }
    },
    /**
     * @description 判断容器
     *
     */
    callBridge : function () {
        var args = arguments,
            bridge = window.AlipayJSBridge;
        bridge ? bridge.call.apply(bridge, args) : document.addEventListener("AlipayJSBridgeReady", function () {
            bridge.call.apply(bridge, args);
        }, !1);
    },
    /**
     * @description 调用容器
     *
     */
    callContainer : function () {
        var that = this;
        if (that.options.type === 'success' || that.options.type === 'error') {
            //fix 容器参数不
            if (that.options.type === 'error') { that.options.type = 'fail'; }
            //执行容器toast
            this.callBridge.call('toast', {
                content: that.options.message,
                type: that.options.type,
                duration: that.options.hideDelay
            });
        };
    }
}

/**
 * @desc        基本调用方法
 * @param       {string|object}    options      调用API参数
 *
 * @memberof    AW.toast
 */
var toast =function (options){
    //对象 参数覆盖
    if(typeof(options) === 'object') {
        _toastSetup.init(options);
    }
    //字符串 直接替换message
    else if(typeof(options) === 'string') {
        _toastSetup.init({
            message: options
        });
    }
}
/**
 * @desc        扩展 - 成功提示
 * @param       {string}    message         提示的文案
 *
 * @memberof    AW
 */
toast.success = function (message){
    toast({
        message: message,
        type: 'success'
    });
}
/**
 * @desc        扩展 - 出错提示
 * @param       {string}    message         提示的文案
 *
 * @memberof    AW
 */
toast.error = function (message){
    toast({
        message: message,
        type: 'error'
    });
}
/**
 * @desc        显示toast
 *
 * @memberof    AW
 */
toast.show = function (message){
    if(typeof(message) === 'undefined') {
        _toastSetup.show();
    } else {
        toast(message);
    }
}
/**
 * @desc        隐藏toast
 * @param       {string}    message         提示的文案
 *
 * @memberof    AW
 */
toast.hide = function (message){
    _toastSetup.hide();
}
/**
 * @desc        toast配置接口
 *
 * @memberof    AW
 */
toast.options = {
    /**
     * @desc        配置HTML
     * @param       {string}    HTMLtext         HTML代码
     *
     * @memberof    AW.toast
     */
    setHTML : function (HTMLtext) {
        _toastSetup.HTMLtext = HTMLtext;
    },
    /**
     * @desc        配置CSS
     * @param       {string}    CSStext         CSS代码
     *
     * @memberof    AW.toast
     */
    setCSS : function (CSStext){
        _toastSetup.CSStext = CSStext;
    },
}

module.exports = toast;