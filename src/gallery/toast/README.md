# AW.toast

---

toast提示

---

## Usage

可以自定义提示文案（message），设置提示类型（success、error），延迟消失时间（hideDelay），是否开启容器方式调用（callContainer）。

```javascript
toast({
    message: '认证成功',
    type: 'success',
    hideDelay: '2500',
    callContainer: true
});
```

## Api

### 配置项

#### message `String` 
  
  * 提示文案

#### type `String` 默认 'none'

  * 'none' : 不显示图标
  * 'success' 会显示成功图标（对钩）
  * 'error' 会显示失败图标（八叉）
  * 'xxx'： 任意名称，需要自己定义图标对应的class属性。例如：am-icon-xxx


### 方法

#### toast() 展示toast

一种简单的调用方式：

```javascript
toast('认证成功');
```

或者完整参数调用：

```javascript
toast({
    message: '认证成功',
    type: 'success',
    hideDelay: '2500',
    callContainer: true
});
```

#### toast.success() 展示成功类型的toast

```javascript
toast.success('认证成功');
```

#### toast.error() 展示失败类型的toast

```javascript
toast.error('付款失败');
```

#### toast.show() 显示toast

```javascript
toast.show();
```

#### toast.hide() 隐藏toast

```javascript
toast.hide();
```

#### oast.options.setHTML() 设置toast HTML

  * <%toast-type%> : 提示类型
  * <%toast-message%> : 提示信息
  
```javascript
toast.options.setHTML('HTML模版必须有 <%toast-type%>和<%toast-message%>');
```

> 注意：使用此方法会替换原有toast HTML模版。

#### oast.options.setCSS() 设置toast CSS
  
```javascript
toast.options.setCSS('.am-toast{position:fixed;z-index:100;top:45%;');
```
> 注意：使用此方法会替换原有toast CSS。
