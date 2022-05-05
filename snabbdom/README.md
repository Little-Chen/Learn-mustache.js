## diff算法

![case1](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/logic-case1.awebp)

以下为各类case下的diff效果测试，可以直接替换index.js内的数据来进行各case下的测试。

## diff各种case测试

### 1. 新旧头节点比较命中
```js
// 头节点命中
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li111'),
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'C'}, 'li3')
])
```
**期望diff结果：**

![case1](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/output-case1.png)

**日志：**

![case1](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/console-case1.png)

### 2.新旧尾节点比较命中

```js
// 尾节点命中
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'D'}, 'li4'),
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'C'}, 'li333'),
])
```

**期望diff结果：**

![case2](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/output-case2.png)

**日志：**

![case2](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/console-case2.png)

### 3. 旧头新尾节点比较命中

旧头新尾节点比较命中：
(1) 将旧头（新尾）对应的dom节点，插入到旧后对应的dom节点之后（代码逻辑上为使用insertBefore到节点nextSibling之前）
(2) 将旧头节点置为undefined
(3) 自增旧头指针及节点，自减新尾指针及节点

```js
// 旧头新尾节点命中
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'D'}, 'li4'),
    h('li',{ key: 'C'}, 'li333'),
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'A'}, 'li1'),
])
```

**期望diff结果：**

![case3](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/output-case3.png)

**日志：**

![case3](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/console-case3.png)

### 4. 旧尾新头节点比较命中

旧尾新头节点比较命中：
(1) 将新头（旧尾）对应的dom节点，插入到旧头对应的dom节点之前
(2) 将旧尾节点置为undefined
(3) 自增新头指针及节点，自减旧尾指针及节点

```js
// 旧尾新头节点命中
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'C'}, 'li333'),
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'D'}, 'li4'),
])
```
**期望diff结果：**

![case4](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/output-case4.png)

**日志：**

![case4](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/console-case4.png)

### 5. 比较后剩余节点处理

(1) 比较后剩余newVnode的子节点

剩余节点，依次插入到newVnode的尾节点后一个节点的前面（如果是最后一个节点，则后一个节点为undefined，此时直接从尾部插入）

```js
// 比较后剩余newVnode的子节点
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'E'}, 'li5'),
    h('li',{ key: 'D'}, 'li4'),
    h('li',{ key: 'C'}, 'li333'),
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'A'}, 'li1'),
])
```

**期望diff结果：**
![case5](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/output-case5.png)

**日志：**

![case5](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/console-case5.png)

(2) 比较后剩余oldVnode的子节点

剩余节点，依次从dom树上移除

```js
// 比较后剩余oldVnode的子节点
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'A'}, 'li1'),
])
```
**期望diff结果：**

![case6](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/output-case6.png)

**日志：**

![case6](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/console-case6.png)

### 6. 两端比较未命中时处理

两端比较未命中时,通过key依次遍历oldVnode的子节点，找寻匹配节点。
(1) 匹配命中：则将匹配节点插入到旧头节点前面，然后将匹配节点为undefined，再自增新头节点索引
(2) 匹配命中：则创建新的孤立dom节点，并将此节点插入到旧头节点前面，然后自增新头节点索引

```js
// 两端比较均未命中时
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
    h('li',{ key: 'D'}, 'li4'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'D'}, 'li4444 '),
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'C'}, 'li3'),
])
```

**期望diff结果：**

![case7](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/output-case7.png)

**日志：**

![case7](https://github.com/Little-Chen/Learn-vue-core/raw/main/snabbdom/page/pic/console-case7.png)



#### 8. 多层子节点验证

```js
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
    h('li',{ key: 'D'}, 'li4'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'D'}, [
        h('p',{ key: 'D-1'}, 'p1'),
        h('p',{ key: 'D-2'}, 'p2'),
        h('p',{ key: 'D-3'}, 'p3')
    ]),
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'C'}, 'li3'),
])
```
