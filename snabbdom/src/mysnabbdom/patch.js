import createElement from "./createElement"
import vnode from "./vnode"

export default function (oldVnode, newVnode) {
    // 判断传入的第一个参数是否为vnode
    if(isNotVnode(oldVnode)){
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {},[], undefined, oldVnode)
    }

    // todo 判断oldVnode和newVnode是不是同一个虚拟节点
    if(sameVnode(oldVnode, newVnode)){
        // 新旧进行对比，更新变化

        // ① 判断新旧节点是否是同一个对象
        if(oldVnode === newVnode) return
        if (newVnode.text !== '' || newVnode.text !== undefined) {
            // 判断新节点是否为文本节点


        } else {
            // 新节点不是文本节点
        }
        

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



/**
 * 
 * 工具函数
 */

function isNotVnode (node) {
    return node.sel == '' || node.sel == undefined
}

function sameVnode (oldVnode, newVnode) {
    const { sel:oldSel, key: oldKey } = oldVnode
    const { sel:newSel, key: newKey } = newVnode
    return oldSel === newSel && oldKey ===newKey
}