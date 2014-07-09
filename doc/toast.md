## toast
	控制页面中提示窗的显示及设置参数

	
### 示例代码
js
```javascript
//简单调用：
toast.show('认证成功');
//完整参数调用：
toast.show({
    message: '认证成功',
    type: 'success',
    hideDelay: '2500',
    callContainer: true
});
toast.hide(); //隐藏
```

### 接口列表
#### toast.show(message|options) 显示toast
`message`
需要显示的消息

`options`
#### message `String` 默认 ''

  * 提示文案

#### type `String` 默认 'none'

  * 'none' : 不显示图标
  * 'success' 会显示成功图标（对钩）
  * 'error' 会显示失败图标（八叉）
  * 'xxx'： 任意名称，需要自己定义图标对应的class属性。例如：am-icon-xxx

#### showDelay `String` 默认 '2500'

  * '2500' : 延时显示toast，毫秒

#### callContainer `Boolean` 默认 'true'

  * true : 开启容器方法
  * false : 关闭容器方法

#### toast.hide() 隐藏toast

### Demo
**二维码地址**

![toast demo 二维码](https://i.alipayobjects.com/i/ecmng/png/201407/30RA5c6f8h.png)

`手机观看效果更好`

查看[Demo](../examples/toast.html)
