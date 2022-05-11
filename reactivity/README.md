## Object.defineProperty()实现响应式

[概念及API](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)


## 实现基本对象的响应式


## 实现数组的响应式

重写了数组原型上的api，扩展了数据响应式的callback
```
push
pop
shift
unshift
splice
sort
reverse
```

### 数组方法
slice: 返回数组的浅拷贝，不改变原数组。
语法：`arr.slice([begin[, end]])`
splice: 会改变原数组

语法：`array.splice(start, deleteCount, item1, item2, ...)`

### arguments对象
arguments 是一个对应于传递给函数的参数的类数组对象
 `arguments` 有`length` 属性 并且属性的索引是从零开始的, 但是它没有 `Array`的 内置方法，