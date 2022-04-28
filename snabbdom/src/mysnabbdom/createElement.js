/**
 * 
 * @param {创建的虚拟节点} vnode 
 */
export default function createElement(vnode) {
    let domNode = document.createElement(vnode.sel)
    const chVnodes = vnode.children
    // 有子节点还是文本节点
    if(vnode.text != '' && (chVnodes === undefined || chVnodes.length === 0)) {
        domNode.innerText = vnode.text
        
    } else if(Array.isArray(chVnodes) && chVnodes.length > 0){
        // 递归创建子节点,并一层层挂在创建的顶层节点下
        for (let i = 0; i < chVnodes.length; i++) {
            let chVnode = chVnodes[i];
            let chNode = createElement(chVnode)
            // 挂在父节点下
            domNode.appendChild(chNode)
        }
    }

    vnode.elm = domNode

    return vnode.elm
}