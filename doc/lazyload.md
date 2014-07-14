## lazyload
	控制文档中图片，在onload后并由于滚动、页面大小变化或切换方向导致图片出现在偏移量范围内再加载真正图片，俗称懒加载

	
### 示例代码
html
```
	<img data-src="real_pic.png">	//页面载入后自动加载real_pic并显示
```
js
```javascript
	var opt = {
		"auto": true,				//是否自动加载标示位
		"offsetPre": 10,			//预加载偏移量，默认10，提升懒加载体验
		"lazyAttr": 'data-src'		//获取延迟加载的图片地址，如data-src = 'http://www.alipay.com/logo.png'
	}
	AW.lazyload.init(opt);			//执行lazyload
	
	AW.lazyload.load(obj);			//加入新的图片组，obj可以是节点，节点数组，父级元素，jQuery选择字符串等
```


### 接口列表

```javascript
	/**
	 * 初始化方法
	 *
	 * @memberof AW.lazyload
	 * @param {?Object} options - 配置参数
	 *
	 * @desc 初始化方法(可供外部调用)
	 *
	 * @example
	 * AW.lazyload.init();
	 * AW.lazyload.init({offsetPre:20});
	 */
	init: function (options)
	
	/**
	 * 资源池新增图片并触发加载监控
	 *
	 * @memberof AW.lazyload
	 * @param {?String|?Object} addStack - 可以为选择器，可以为节点数据集，可以为节点
	 *
	 * @desc 资源池新增图片并触发加载监控
	 *
	 * @example
	 * AW.lazyload.load('.lazy img');//选择器
	 * AW.lazyload.load([Nodelist]);//节点Nodelist（伪数组）
	 * AW.lazyload.load([Array]);//节点Array
	 * AW.lazyload.load(ImageElement);//图片节点
	 * AW.lazyload.load(OtherElement);//除图片外其它节点，找寻内部图片节点
	 * AW.lazyload.load(jQueryObject);//jQuery节点集（伪数组）
	 * AW.lazyload.load(ZeptoObject);//Zepto节点集（伪数组）
	 *
	 */
	load: function (addStack)
	
	/**
	 * 资源池新增图片
	 *
	 * @memberof AW.lazyload
	 * @param {?String|?Object} addStack - 可以为选择器，可以为节点数据集，可以为节点
	 *
	 * @desc 资源池新增图片
	 *
	 * @example
	 * AW.lazyload.add('.lazy img');//选择器
	 * AW.lazyload.add([Nodelist]);//节点Nodelist（伪数组）
	 * AW.lazyload.add([Array]);//节点Array
	 * AW.lazyload.add(ImageElement);//图片节点
	 * AW.lazyload.add(OtherElement);//除图片外其它节点，找寻内部图片节点
	 * AW.lazyload.add(jQueryObject);//jQuery节点集（伪数组）
	 * AW.lazyload.add(ZeptoObject);//Zepto节点集（伪数组）
	 *
	 */
	add: function (addStack)
	
	/**
	 * 对资源池添加懒加载监听，同一时间内有限运行仅一次
	 *
	 * @memberof AW.lazyload
	 *
	 * @desc 对资源池添加懒加载监听，同一时间内有限运行仅一次
	 *
	 * @example
	 * AW.lazyload.addLoadListener();
	 */
	addLoadListener: function ()
	
	/**
	 * 对资源池移除懒加载监听
	 *
	 * @memberof AW.lazyload
	 *
	 * @desc 对资源池移除懒加载监听
	 *
	 * @example
	 * AW.lazyload.addLoadListener();
	 */
	removeLoadListener: function ()
	
	/**
	 * 当前时机，执行一次懒加载遍历尝试
	 *
	 * @memberof AW.lazyload
	 *
	 * @desc 当前时机，执行一次懒加载遍历尝试
	 *
	 */
	run: function ()
	
```

### Demo
**二维码地址**

![lazyload demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RDnPmXup.png)

`手机观看效果更好`

查看[Demo](../examples/lazyload.html)
