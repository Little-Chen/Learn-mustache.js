// import {
//     init,
//     classModule,
//     propsModule,
//     styleModule,
//     eventListenersModule,
//     h,
//   } from "snabbdom";

// const patch = init([
// // 通过传入模块初始化 patch 函数
// classModule, // 开启 classes 功能
// propsModule, // 支持传入 props
// styleModule, // 支持内联样式同时支持动画
// eventListenersModule, // 添加事件监听
// ]);
  
import patch from './mysnabbdom/patch'
import h from "./mysnabbdom/h"

// var vnode1 = h('a', {
//     props:{
//         href: 'http://www.baidu.com',
//         target: '_blank'
//     }
// }, '测试dom内容')

// var vnode2 = h('ul', {
//     class: {
//         test: true
//     }
// }, [
//     h('li',{}, 'li1'),
//     h('li',{}, 'li2'),
//     h('li',{}, 'li3'),
// ])

// 
// var vnode3 = h('ul', {}, [
//     h('li',{ key: 'A'}, 'li1'),
//     h('li',{ key: 'B'}, 'li2'),
//     h('li',{ key: 'C'}, 'li3'),
// ])

// var vnode4 = h('ul', {}, [
//     h('li',{ key: 'A'}, 'li1'),
//     h('li',{ key: 'B'}, [
//         h('p',{},'11'),
//         h('p',{},'22')
//     ]),
//     h('li',{ key: 'C'}, 'li3'),
//     h('li',{ key: 'D'}, 'li4'),
// ])

// 测试
var vnode3 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li2'),
    h('li',{ key: 'C'}, 'li3'),
])

var vnode4 = h('ul', {}, [
    h('li',{ key: 'A'}, 'li1'),
    h('li',{ key: 'B'}, 'li22222'),
    h('li',{ key: 'C'}, 'li3'),
    h('li',{ key: 'D'}, 'li4'),
])

const container = document.getElementById('container')

const btn = document.getElementById('btn')

patch(container, vnode3)

btn.onclick = function () {
    patch(vnode3,vnode4)
}