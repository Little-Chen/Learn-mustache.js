/**
 * 
 * 工具函数
 */

export function isNotVnode (node) {
    return node.sel == '' || node.sel == undefined
}

export function sameVnode (oldVnode, newVnode) {
    const { sel:oldSel, key: oldKey } = oldVnode
    const { sel:newSel, key: newKey } = newVnode
    return oldSel === newSel && oldKey ===newKey
}