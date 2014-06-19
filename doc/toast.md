## toast
	控制页面中提示窗的显示及设置参数

### 接口列表

```
	/**
	 * 显示toast
	 *
	 * @memberof AW.loading
	 *
	 * @desc 外部调用
	 *
	 */
	show: function (callback)
	
	/**
	 * 隐藏toast
	 *
	 * @memberof AW.loading
	 *
	 * @desc 外部调用
	 *
	 */
	hide: function ()
	
	/**
	 * 确认按钮的回调函数
	 *
	 * @memberof AW.loading
	 *
	 * @type {Function}
	 */
	success: function ()
	
	/**
	 * 取消按钮的回调函数
	 *
	 * @memberof AW.loading
	 *
	 * @type {Function}
	 */
	cancel: function ()
	
```

### 示例代码

```
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
	 
	var opt = {
		target: '.J-am-toast',
		message: '这里是默认文案，请添加',
		type: 'none',
		hideDelay: '2500',
		showDelay: '0',
		animate: 'none',
		isWebview: true
	}
	
	dialog(opt);	//开启窗口
```

### 演示 可选