# AW.dialog

---

dialogu对话框

---

## Usage

可以自定义标题（title）提示文案（message），类型（type），确定（okButton）和取消（cancelButton）按钮的文案，是否开启容器方式调用（callContainer），以及点击按钮之后的回调函数。

```javascript
AW.dialog.confirm('确定要这么干吧', function(result){
    console.log(result.ok)
});
```

## Api

### 配置项

#### title `String` 标题 ''
  
  * dialog标题

#### message `String` 默认 ''
  
  * dialog正文

#### type `String` 默认 'alert'

  * 'alert' : 一般dialog，没有取消按钮；
  * 'confirm' : 确认dialog，有取消按钮，点击取消关闭dialog。

#### okButton `String` 默认 '确定'
  
  * 确认按钮文案

#### cancelButton `String` 默认 '取消'
  
  * 取消按钮文案

#### callContainer `Boolean` 默认 'true'

  * true : 开启容器方法
  * false : 关闭容器方法

### 方法

#### AW.dialog.show() 显示dialog

完整参数调用：

```javascript
AW.dialog.show({
    title: '亲',
    message: '确定要这么干吧',
    type : 'alert',
    okButton: '支付',
    cancelButton: '取消',
    callContainer: true
}, function(result){
    console.log(result.ok)
});
```

  * result : 回调返回值。
    * result.ok : 布尔值，点击确定按钮返回“true”，点击取消按钮返回“false”。

#### AW.dialog.alert() 显示alert类型的dialog

```AW.dialog.alert('确定要这么干吧');
```

回调：

```AW.dialog.alert('确定要这么干吧', function(result){
    console.log(result.ok)
});
```

#### AW.dialog.confirm() 显示confirm类型的dialog

```AW.dialog.confirm('确定要这么干吧');
```

回调：

```AW.dialog.confirm('确定要这么干吧', function(result){
    console.log(result.ok)
});
```

#### AW.dialog.hide() 隐藏dialog

```javascript
AW.loading.hide();
```
