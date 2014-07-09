## button
	模拟按钮在按下移动后回复无点击状态

### 示例代码
html
在html表里直接使用以下的标志，该组件在dom ready之后，会对以下所有具有这样特性的button进行初始化
```
<button data-active-class="hover">			//声明按下的状态效果class名为hover
```
js
如果你在页面上动态加入了按钮之后，则需要使用js的方式进行初始化
```javascript
	var oBtn = new AW.button(document.getElementById('#btn')});	//将#btn作为Button的实例化
	oBtn.unlock();				//按钮立刻可以点击并触发事件
	oBtn.tap(					//绑定指定的点击事件，在1000毫秒内不可再次触发亦不可点击
		function(){
			//指定事件
		}, 
		1000,
		true
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
	
	
	/**
	 * 强制解锁button的锁定状态
	 */
	Button.prototype.unlock = function ()
```

### Demo
**二维码地址**

![button demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RBgvTdV9.png)

`手机观看效果更好`

查看[Demo](../examples/button.html)
