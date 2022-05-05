/**
 * 
 * 工具函数
 */

export function isNotVnode (node) {
    return node.sel == '' || node.sel == undefined
}

export function sameVnode (oldVnode, newVnode) {
    const { sel:oldSel, data: { key: oldKey }} = oldVnode
    const { sel:newSel, data: { key: newKey }} = newVnode
    return oldSel === newSel && oldKey ===newKey
}