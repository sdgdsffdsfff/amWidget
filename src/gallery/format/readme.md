## InputFormat

对文本框中输入的数据自动格式化为某种固定格式。  

支持 AMD、CMD 规范，在不使用此类规范的环境中会以 [AW.InputFormat](http://www.google.com) 全局变量开放出来。

API文档: [http://site.alipay.im/AM/about/about.html](http://site.alipay.im/AM/about/about.html)


### 如何使用

1. 引入包含`InputFormat`功能的JS文件；
2. 在目标文本框中定义`data-format`属性，属性值为`字符位数`+`分隔符`组成的规则；
3. 页面加载完成后会自动绑定其`input`事件；


### 示例

* 自动绑定  
  
  ```
  <input type="text" data-format="4 " maxlength="13" value="abcdefghijkmln" />
  ```
* 手动绑定（用于动态追加元素时绑定格式化事件） 

  ```
  AW.InputFormat.listen(HTMLInputElement); 
  ```
 
### 更新日志

* 2014-05-27
	* 基本功能实现
	* 增加文档初始化后自动绑定文本框事件功能
