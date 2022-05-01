import createElement from "./createElement"
import vnode from "./vnode"
import { isNotVnode, sameVnode } from "./utils"
import patchVnode from "./patchVnode"

// 目前逻辑不支持同时存在text和chidren的情况

export default function (oldVnode, newVnode) {
    // 判断传入的第一个参数是否为vnode
    if(isNotVnode(oldVnode)){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {},[], undefined, oldVnode)
    }

    // todo 判断oldVnode和newVnode是不是同一个虚拟节点
    if(sameVnode(oldVnode, newVnode)){
        // 新旧进行对比，更新变化
        patchVnode(oldVnode, newVnode)
    } else {
        // 创建新的节点，并插入dom树
        let domNode = createElement(newVnode)

        const parentNode = oldVnode.elm.parentNode

        // 插入新节点
        parentNode.insertBefore(domNode, oldVnode.elm)

        // 移除老节点
        parentNode.removeChild(oldVnode.elm)

    }
}
