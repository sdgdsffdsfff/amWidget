## dialog
	控制页面中提示窗的显示及设置参数

### 接口列表

```
	/**
	 * 显示toast
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 外部调用
	 *
	 */
	show: function (callback)
	
	/**
	 * 隐藏toast
	 *
	 * @memberof AW.dialog
	 *
	 * @desc 外部调用
	 *
	 */
	hide: function ()
	
	/**
	 * 确认按钮的回调函数
	 *
	 * @memberof AW.dialog
	 *
	 * @type {Function}
	 */
	success: function ()
	
	/**
	 * 取消按钮的回调函数
	 *
	 * @memberof AW.dialog
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
	 
	var opt = {
	{
		target: '.J-am-dialog',				//className
		title: '亲',						//标题栏
		message: '这里是默认文案，请添加',	//默认文案
		button: '确定',						//btn内容
		animate: 'none',					//动画效果
		isWebview: true						//是否开启容器调用
	}
	
	dialog(opt);	//开启窗口
```

### 演示 可选