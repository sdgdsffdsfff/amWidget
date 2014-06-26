# AW.toast

---

toast\u63D0\u793A

---

## Usage

\u53EF\u4EE5\u81EA\u5B9A\u4E49\u63D0\u793A\u6587\u6848\uFF08message\uFF09\uFF0C\u8BBE\u7F6E\u63D0\u793A\u7C7B\u578B\uFF08success\u3001error\uFF09\uFF0C\u5EF6\u8FDF\u6D88\u5931\u65F6\u95F4\uFF08hideDelay\uFF09\uFF0C\u662F\u5426\u5F00\u542F\u5BB9\u5668\u65B9\u5F0F\u8C03\u7528\uFF08callContainer\uFF09\u3002

```javascript
toast({
    message: '\u8BA4\u8BC1\u6210\u529F',
    type: 'success',
    hideDelay: '2500',
    callContainer: true
});
```

## Api

### \u914D\u7F6E\u9879

#### message `String` \u9ED8\u8BA4 ''
  
  * \u63D0\u793A\u6587\u6848

#### type `String` \u9ED8\u8BA4 'none'

  * 'none' : \u4E0D\u663E\u793A\u56FE\u6807
  * 'success' \u4F1A\u663E\u793A\u6210\u529F\u56FE\u6807\uFF08\u5BF9\u94A9\uFF09
  * 'error' \u4F1A\u663E\u793A\u5931\u8D25\u56FE\u6807\uFF08\u516B\u53C9\uFF09
  * 'xxx'\uFF1A \u4EFB\u610F\u540D\u79F0\uFF0C\u9700\u8981\u81EA\u5DF1\u5B9A\u4E49\u56FE\u6807\u5BF9\u5E94\u7684class\u5C5E\u6027\u3002\u4F8B\u5982\uFF1Aam-icon-xxx

#### hideDelay `String` \u9ED8\u8BA4 '2500'

  * '2500' : \u5EF6\u65F6\u9690\u85CFtoast\uFF0C\u6BEB\u79D2

#### callContainer `Boolean` \u9ED8\u8BA4 'true'

  * true : \u5F00\u542F\u5BB9\u5668\u65B9\u6CD5
  * false : \u5173\u95ED\u5BB9\u5668\u65B9\u6CD5

### \u65B9\u6CD5

#### toast() \u5C55\u793Atoast

\u4E00\u79CD\u7B80\u5355\u7684\u8C03\u7528\u65B9\u5F0F\uFF1A

```javascript
toast('\u8BA4\u8BC1\u6210\u529F');
```

\u6216\u8005\u5B8C\u6574\u53C2\u6570\u8C03\u7528\uFF1A

```javascript
toast({
    message: '\u8BA4\u8BC1\u6210\u529F',
    type: 'success',
    hideDelay: '2500',
    callContainer: true
});
```

#### toast.success() \u5C55\u793A\u6210\u529F\u7C7B\u578B\u7684toast

```javascript
toast.success('\u8BA4\u8BC1\u6210\u529F');
```

#### toast.error() \u5C55\u793A\u5931\u8D25\u7C7B\u578B\u7684toast

```javascript
toast.error('\u4ED8\u6B3E\u5931\u8D25');
```

#### toast.show() \u663E\u793Atoast

```javascript
toast.show();
```

#### toast.hide() \u9690\u85CFtoast

```javascript
toast.hide();
```

#### toast.options.setHTML() \u8BBE\u7F6Etoast HTML

  * <%toast-type%> : \u63D0\u793A\u7C7B\u578B
  * <%toast-message%> : \u63D0\u793A\u4FE1\u606F
  
```javascript
toast.options.setHTML('HTML\u6A21\u7248\u5FC5\u987B\u6709 <%toast-type%>\u548C<%toast-message%>');
```

> \u6CE8\u610F\uFF1A\u4F7F\u7528\u6B64\u65B9\u6CD5\u4F1A\u66FF\u6362\u539F\u6709toast HTML\u6A21\u7248\u3002

#### toast.options.setCSS() \u8BBE\u7F6Etoast CSS
  
```javascript
toast.options.setCSS('.am-toast{position:fixed;z-index:100;top:45%;');
```
> \u6CE8\u610F\uFF1A\u4F7F\u7528\u6B64\u65B9\u6CD5\u4F1A\u66FF\u6362\u539F\u6709toast CSS\u3002
