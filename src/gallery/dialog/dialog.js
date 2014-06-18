/**
 *
 * AW dialog
 * @namespace AW
 * @author 叶清 <yeqing@alipay.com>
 * @version 1.0.0
 *
 * */

'use strict';

var dialog = function (attrs) {
	this._init.apply(this, arguments);
};
var ua = navigator.userAgent;

dialog.prototype = {
	/**
	 * 默认配置参数
	 *
	 * @memberof AW.dialog
	 * @param {!Object} target - className
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
	attrs: {
		target: '.J-am-dialog',
		title: '亲',
		message: '这里是默认文案，请添加',
		button: '确定',
		animate: 'none',
		isWebview: true
	},
	/**
	 * 初始化
	 *
	 * @memberof AW.dialog
	 * @param {!Object} attr - 初始化参数
	 *
	 * @desc 初始化
	 *
	 */
	_init: function (attrs) {
		//初始化参数覆盖
		for (var p in attrs) {
			this.attrs[p] = attrs[p];
		}

		//执行容器
		if (ua.indexOf('AlipayClient') > 0 && this.attrs.isWebview) {
			this._setWebview(attrs);
			return true;
		}

		//设置message & type
		this._setTpl(attrs);
	},
	// 是否显示标识
	rendered: false,
	/**
	 * 显示toast
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 外部调用
	 *
	 */
	show: function (callback) {
		var _self = this;
		if (_self.rendered) return true;
		_self._callback = callback;
		var el = document.querySelector(_self.attrs.target);
		//延迟显示
		el.style.visibility = 'visible';
		_self.rendered = true;
		_self._callback();
	},
	/**
	 * 隐藏toast
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 外部调用
	 *
	 */
	hide: function () {
		var _self = this;
		var el = document.querySelector(_self.attrs.target);
		el.style.visibility = 'hidden';
		_self.rendered = false;
	},

	/**
	 * 确认按钮的回调函数
	 *
	 * @memberof AW.dialog
	 *
	 * @type {Function}
	 */
	success: function () {
		this.hide();
	},
	/**
	 * 取消按钮的回调函数
	 *
	 * @memberof AW.dialog
	 *
	 * @type {Function}
	 */
	cancel: function () {
		this.hide();
	},
	/**
	 * 设置toast模版
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 设置toast模版
	 *
	 */
	_setTpl: function (attrs) {
		var _self = this;
		var el = document.querySelector(_self.attrs.target);
		if (_self.attrs.type == 'success') {
			_self.attrs.type = 'right'
		}
		else if (_self.attrs.type == 'error') {
			_self.attrs.type = 'wrong'
		}
		el.innerHTML = '<div class="am-dialog">'
			+ '    <div class=" am-dialog-content">'
			+ '        <div class="am-dialog-title">' + _self.attrs.title + '</div>'
			+ '        <p>' + _self.attrs.message + '</p>'
			+ '        <div class="am-flexbox am-flexbox-average">'
			+ '            <div class="am-flexbox-item">'
			+ '                <button type="button" class="J-dialog-cancel am-button am-button-white">取消</button>'
			+ '            </div>'
			+ '            <div class="am-flexbox-item">'
			+ '                <button type="button" class="J-dialog-success am-button am-button-blue">' + _self.attrs.button + '</button>'
			+ '            </div>'
			+ '        </div>'
			+ '    </div>'
			+ '</div>'
		document.querySelector('.J-dialog-cancel').addEventListener("click", function (ele) {
			_self.hide();
		}, false);
		document.querySelector('.J-dialog-success').addEventListener("click", function (ele) {
			_self.hide();
		}, false);
	},
	//todo 依赖fx组件
	_animate: function () {
	},
	/**
	 * 设置支付宝方法
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 设置支付宝方法
	 *
	 */
	_setWebview: function () {
		var _self = this;
		//执行容器loading
		AlipayJSBridge.call('alert', {
			title: _self.attrs.title,
			message: _self.attrs.message,
			button: _self.attrs.button
		}, function () {
			_self._callback();
		});
	}
};
module.exports = dialog;
