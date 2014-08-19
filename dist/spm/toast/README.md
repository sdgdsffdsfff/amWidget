# AW.toast

---

toast提示

---

## spm地址
http://spmjs.io/package/amw-toast/

## Usage

可以自定义提示文案（message），设置提示类型（none、success、error），延迟消失时间（hideDelay），是否开启容器方式调用（callContainer）。

```javascript
AW.toast.show('认证成功');

//seajs使用方式
seajs.use("amw-toast",function(toast){
	toast.show('认证成功');
});

```

## Api

### 配置项

#### message `String` 默认 ''
  
  * 提示文案

#### type `String` 默认 'none'

  * 'none' : 不显示图标
  * 'success' 会显示成功图标（对钩）
  * 'error' 会显示失败图标（八叉）
  * 'xxx'： 任意名称，需要自己定义图标对应的class属性。例如：am-icon-xxx

#### hideDelay `String` 默认 '2500'

  * '2500' : 延时隐藏toast，毫秒

#### callContainer `Boolean` 默认 'true'

  * true : 开启容器方法
  * false : 关闭容器方法

### 方法

#### toast.show() 显示toast

简单调用：

```javascript
AW.toast.show('认证成功');

//seajs使用方式
seajs.use("amw-toast",function(toast){
	toast.show('认证成功');
});
```

或者完整参数调用：

```javascript
AW.toast.show({
    message: '认证成功',
    type: 'success',
    hideDelay: '2500',
    callContainer: true
});

//seajs使用方式
seajs.use("amw-toast",function(toast){
	toast.show({
        message: '认证成功',
        type: 'success',
        hideDelay: '2500',
        callContainer: true
    })
});
```

#### toast.hide() 隐藏toast

```javascript
AW.toast.hide();

//seajs使用方式
seajs.use("amw-toast",function(toast){
	toast.hide();
});
```
