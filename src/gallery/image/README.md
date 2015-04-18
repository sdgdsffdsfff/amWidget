## image

图片组件，提供懒加载，webpp，placehold的支持

### 示例代码
html
在html表里直接使用以下的标志，该组件在dom ready之后，会对以下所有具有这样特性的便签进行初始化
默认自动开启lazyload模式，如果不希望设置 data-img-lazyload="false" 

```html
<img data-img-src="" data-img-placehold=""/>			
<div data-img-src="" ></div>
```
js
如果你在页面上动态加入了按钮之后，则需要使用js的方式进行初始化,支持zepto对象
```javascript
	AW.image.render(DOMObj/ZeptoObj)
	)
```

### 接口列表

```javascript

	/**
	 * 为一个Button实例绑定一个tap事件
	 * @param {function|number|boolean} [fn] 需要绑定的tap事件。如果为number类型则自动识别为timelock;如果为boolean自动识别为enableAutoDisabled
	 * @param {function|number|boolean} [timelock] 私有的timelock值。如果为boolean自动识别为enableAutoDisabled
	 * @param {function|number|boolean} [enableAutoDisabled] 私有的autoDisabled
	 * @returns {Button}
	 *
	 * @example
	 * var button = new Button(document.getElementById('button')}).tap(function(){});
	 */
	Button.prototype.tap = function (fn, timelock, enableAutoDisabled)
	
```

### Demo
**二维码地址**

![button demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RBgvTdV9.png)

`手机观看效果更好`

查看[Demo](../examples/button.html)
