## InputFormatter

对文本框中输入的数据自动格式化为某种固定格式。  


### 示例代码
html
```
	<input type="text" data-format="4,"/>		input内容自动每4个分为1组,分隔符为逗号
```

js
```
	var list = document.getElementsByTagName("input");	//获取输入框元素集
	AJ.inputFormatter.listen(list);					//list为要监听的元素以数组形式的集合
```


### 接口列表

```
	/**
	 * @desc        输入事件监听
	 * @param       {DOM NodeList}    list    要监听的文本框元素 NodeList
	 * @name        AW.InputFormatter.listen
	 */
	kbc.listen = function (list)
	
```

### Demo