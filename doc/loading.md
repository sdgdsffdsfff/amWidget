## loading
	在H5容器不支持相应效果时，为数据加载loading过程做出可配置提示

### 示例代码

js
loading配置参数
```javascript
	/**
	 * @description 默认配置参数
	 *
	 * @param {String} message - 默认文案
	 * @param {String} showDelay - 延迟隐藏时间（毫秒）
	 * @param {Boolean} callContainer - 是否开启容器native调用
	 *
	 * @memberof    AW.loading
	 *
	 */
	loading.options = {
		'message': '',
		'showDelay': '0',
		'callContainer': true
	}
```

### 接口列表

```javascript

	/**
	 * @description        loading
	 * @param {string|object} options
	 *
	 * @memberof    AW.loading
	 */
	loading.show = function (options)
	
	
	/**
	 * @description        隐藏loading
	 *
	 * @memberof    AW.loading
	 */
	loading.hide = function ()
```

### Demo
**二维码地址**

![loading demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/32Pbl2Lmw1.png)

`手机观看效果更好`

查看[Demo](../examples/loading.html)