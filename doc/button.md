## button
	模拟按钮在按下移动后回复无点击状态

### 示例代码
html
在html表里直接使用以下的标志，该组件在dom ready之后，会对以下所有具有这样特性的button进行初始化
```
<button data-active-class="hover">			//声明按下的状态效果class名为hover, 默认为active
```
js
如果你在页面上动态加入了按钮之后，则需要使用js的方式进行初始化
```
	var oBtn = new AW.button(document.getElementById('btn')});	//将#btn作为Button的实例化
	oBtn.timeLock = 1000;			//可选 1000毫秒内不可以再次触发事件
	oBtn.autoDisabled = true;		//可选 按钮不可点击
	oBtn.unlock = true;				//可选 按钮立刻可以点击并触发事件
	oBtn.tap(						//可选 绑定指定的点击事件，在1000毫秒内不可再次触发亦不可点击
		function(){
			//指定事件
		}, 
		1000,
		true
	)
```

### 接口列表

```
	/**
	 * Button类的prototype值，如果大于0则代表该button将启用timeLock功能，时间间隔内不能再次触发tap事件.该属性可选
	 * @enum {number}
	 */
	Button.prototype.timeLock = 0;

	/**
	 * Button类的prototype值，如果为true则代表该button在timeLock期间会在dom结构上增加[disabled='disabled']属性
	 * @enum {boolean}
	 */
	Button.prototype.autoDisabled = false;

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
	 * 强制解锁一个button的锁定状态
	 */
	Button.prototype.unlock = function ()
```


### 演示