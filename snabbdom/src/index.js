import {
    init,
    classModule,
    propsModule,
    styleModule,
    eventListenersModule,
    h,
  } from "snabbdom";

// const patch = init([
// // 通过传入模块初始化 patch 函数
// classModule, // 开启 classes 功能
// propsModule, // 支持传入 props
// styleModule, // 支持内联样式同时支持动画
// eventListenersModule, // 添加事件监听
// ]);
  
import patch from './mysnabbdom/patch'

var vnode1 = h('a', {
    props:{
        href: 'http://www.baidu.com',
        target: '_blank'
    }
}, '测试dom内容')

var vnode2 = h('ul', {
    class: {
        test: true
    }
}, [
    h('li',{}, 'li1'),
    h('li',{}, 'li2'),
    h('li',{}, 'li3'),
])

const container = document.getElementById('container')

const btn = document.getElementById('btn')

patch(container, vnode1)

btn.onclick = function () {
    patch(vnode1,vnode2)
}