import createElement from "./createElement"
import patchVnode from "./patchVnode"
import { sameVnode } from "./utils"

/**
 * 子节点对比算法：
 * 参考文章：https://juejin.cn/post/6919376064833667080#heading-8
 * 
 * @param {父节点} pElm 
 * @param {旧子节点集合} oldCh 
 * @param {新子节点集合} newCh 
 */

export default function updateChildren (pElm, oldCh, newCh) {
    // 新旧前后指针
    let oldStartIndex = 0
    let newStartIndex = 0
    let oldEndIndex = oldCh.length - 1
    let newEndIndex = newCh.length - 1
    // 新旧前后节点
    let oldStartVnode = oldCh[oldStartIndex]
    let oldEndVnode = oldCh[oldEndIndex]
    let newStartVnode = newCh[newStartIndex]
    let newEndVnode = newCh[newEndIndex]

    let oldKeyToIdx  // key与索引映射对象

    // 当新旧的前后指针未重叠，则继续循环，进行——双端比较法
    while(oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        // 当旧列表遍历的节点为undefined时，跳过当前节点
        if(oldStartVnode === undefined) {
            oldStartVnode = oldCh[++oldStartIndex]
        } else if(oldEndVnode === undefined) {
            oldEndVnode = oldCh[--oldEndIndex]
        } 
        // 新前与旧前
        else if(sameVnode(newStartVnode, oldStartVnode)){
            console.log('命中新前与旧前');
            patchVnode(oldStartVnode, newStartVnode)
            // 命中则指针移动（新前与旧前均自增）
            oldStartVnode = oldCh[++oldStartIndex]
            newStartVnode = newCh[++newStartIndex]
        }
        //  新后与旧后
        else if(sameVnode(newEndVnode, oldEndVnode)) {
            console.log('命中新后与旧后');
            patchVnode(oldEndVnode, newEndVnode)

            // 命中则指针移动（新后与旧后均自减）
            oldEndVnode = oldCh[--oldEndIndex]
            newEndVnode = newCh[--newEndIndex]
        }
        // 新后与旧前
        else if(sameVnode(newEndVnode, oldStartVnode)){
            console.log('命中新后与旧前');
            patchVnode(oldStartVnode, newEndVnode)

            // 此时需要移动旧前（新后）指向的节点到旧后节点的后面
            pElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)

            // 原节点置为undefined
            oldStartVnode = undefined

            // 命中则指针移动（新后自减，旧前自增）
            oldStartVnode = oldCh[++oldStartIndex]
            newEndVnode = newCh[--newEndIndex]
        }
        // 新前与旧后 
        else if(sameVnode(newStartVnode, oldEndVnode)){
            console.log('命中新前与旧后');
            patchVnode(oldEndVnode, newStartVnode)

            // 此时需要移动旧后（新前）指向的节点到旧前节点的前面
            pElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)

            // 原节点置为undefined
            oldEndVnode = undefined

            // 命中则指针移动（旧后自减，新前自增）
            oldEndVnode = oldCh[--oldEndIndex]
            newStartVnode = newCh[++newStartIndex]
        } 
        // 全未命中，使用循环来进一步匹配
        else { 
            // 生成旧节点的key与索引映射
            if(oldKeyToIdx === undefined){
                oldKeyToIdx = createkeyToIdx(oldCh, oldStartIndex, oldEndIndex)
            }
            // 使用新列表的第一个节点，去旧列表遍历对比
            let idxInOld = oldKeyToIdx[newStartVnode.data.key]

            // 若旧列表中未命中，则创建一个新节点，插入到旧前节点的前面
            if(!idxInOld){
                console.log('均未命中时，将此节点插入到旧头节点前面', oldStartVnode.elm)
                let dom = createElement(newStartVnode)

                pElm.insertBefore(dom, oldStartVnode.elm)
            }
            // 在旧列表中命中，则将命中的节点移动到旧前节点的前面
            else{ 
                // todo 进一步比较节点Tag标签
                console.log('遍历旧列表节点匹配命中，则进行节点移动：', oldStartVnode.elm)
                let elmToMove = oldCh[idxInOld]
                patchVnode(elmToMove, newStartVnode)
                pElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
                // 原节点置为undefined
                oldCh[idxInOld] = undefined
            }
            // 然后新前指针自增
            newStartVnode = newCh[++newStartIndex]
        }         
    }

    // 跳出循环后：
    // 如果是newCh节点指针触发的中止，则oldCh的剩余节点需要删除
    // 如果是oldCh节点指针触发的中止，则newCh的剩余节点需要新增到旧前节点的前面
    if(newStartIndex > newEndIndex) {
        // 删除oldCh的剩余节点
        removeVnodes(pElm, oldCh, oldStartIndex, oldEndIndex)
    } else {
        // 标杆
        const before = newCh[newEndIndex+1] ? newCh[newEndIndex+1].elm : null 
        // const before = oldCh[newEndIndex+1].elm  
        // 插入newCh的剩余节点到旧前节点的前面
        addVnodes(pElm, before, newCh, newStartIndex, newEndIndex)
    }
}

function createkeyToIdx (arr, start, end) {
    let keys = {}
    for (let i = start; i <= end; i++) {
        const key = arr[i].data.key
        keys[key] = i
    }
    return keys
}

function removeVnodes (pElm, oldCh, start, end) {
    for (let i = start; i <= end; i++) {
        if(oldCh[i]){
            console.log('删除子节点：', oldCh[i].elm)
            pElm.removeChild(oldCh[i].elm)
        }
    }
}

function addVnodes(pElm, before, arr, start, end) {
    for (let i = start; i <= end; i++) {
        if(arr[i]){
            // before为null时为尾部插入
            console.log('插入子节点：', createElement(arr[i]))
            pElm.insertBefore(createElement(arr[i]), before)
        }
    }
}