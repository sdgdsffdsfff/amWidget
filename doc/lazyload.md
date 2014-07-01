## lazyload
	控制文档中图片，在onload后并由于滚动、页面大小变化或切换方向导致图片出现在偏移量范围内再加载真正图片，俗称懒加载

	
### 示例代码
html
```
	<img data-src="real_pic.png">	//页面载入后自动加载real_pic并显示
```
js
```
	var opt = {
		"auto": true,				//是否自动加载标示位
		"offsetPre": 10,			//预加载偏移量，默认10，提升懒加载体验
		"lazyAttr": 'data-src'		//获取延迟加载的图片地址，如data-src = 'http://www.alipay.com/logo.png'
	}
	AW.lazyload.init(opt);			//执行lazyload
	
	AW.lazyload.load(obj);			//加入新的图片组，obj可以是节点，节点数组，父级元素，jQuery选择字符串等
```


### 接口列表

```
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
	 * 添加新的图片
	 *
	 * @memberof AW.lazyload
	 * @param {?String|Object} addStack - 可以为选择器，可以为节点数据集，可以为节点
	 *
	 * @desc 添加新的图片(可供外部调用)
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
	load: function (addStack)
	
```

### Demo