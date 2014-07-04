# AW.loading

---

loading提示

---

## Usage

可以自定义提示文案（message），延迟显示时间（showDelay），是否开启容器方式调用（callContainer）。

```javascript
AW.loading.show('认证成功');
```

## Api

### 配置项

#### message `String` 默认 ''
  
  * 提示文案

#### showDelay `String` 默认 '0'

  * '2500' : 延时显示loading，毫秒

#### callContainer `Boolean` 默认 'true'

  * true : 开启容器方法
  * false : 关闭容器方法

### 方法

#### AW.loading.show() 显示loading

简单调用：

```javascript
AW.loading.show('加载中...');
```

或者完整参数调用：

```javascript
AW.loading.show({
    message: '加载中...',
    showDelay: '2500',
    callContainer: true
});
```

#### AW.loading.hide() 隐藏loading

```javascript
AW.loading.hide();
```
