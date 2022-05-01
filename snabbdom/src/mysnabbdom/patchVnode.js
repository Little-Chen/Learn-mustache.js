import createElement from "./createElement";
import updateChildren from "./updateChildren";
import { isNotVnode, sameVnode } from "./utils"

export default function patchVnode (oldVnode, newVnode) {
    console.log('对比节点：');
    // ① 判断新旧节点是否是同一个对象
    if(oldVnode === newVnode) return
    
    if (newVnode.text !== undefined && 
        (newVnode.children == undefined || newVnode.children.length == 0)) { // 新节点为文本节点
        if(newVnode.text !== oldVnode.text) { // 新旧text不相同
            oldVnode.elm.innerText = newVnode.text
        }
    } else {
        // 新节点case:
        // 1.text为undefined，无children
        // 2.text为undefined，有children
        // 3.text有，也有children

        if(oldVnode.children !== undefined && oldVnode.children.length > 0){ // 老节点含有children节点
            if(newVnode.children == undefined || newVnode.children.length == 0) { // 新节点没有children
                oldVnode.elm.innerHTML = newVnode.text;
            } else { // 新旧节点均有children
                console.log('新旧节点均有children');
                updateChildren(oldVnode.elm, oldVnode.children, newVnode.children)
                // let un = 0 // newVnode.children中未处理的节点指针

                // for (let i = 0; i < newVnode.children.length; i++) {
                //     const vnode = newVnode.children[i];
                //     let isExist = false

                //     for (let j = 0; j < oldVnode.children.length; j++) {
                //         const ovnode = oldVnode.children[j];
                //         if(sameVnode(ovnode, vnode)){
                //             isExist = true
                //         }
                //     }

                //     if(!isExist){
                //         let dom = createElement(vnode)
                //         vnode.elm = dom

                //         if(un < oldVnode.children.length){
                //             oldVnode.elm.insertBefore(dom, oldVnode.children[un].elm)
                //         } else {
                //             oldVnode.elm.appendChid(dom)
                //         }
                //     } else {
                //         // 指针下移
                //         un++
                //     }
                // }
            }
        } else { // 老节点为text节点 
            oldVnode.elm.innerHTMl = ''
            oldVnode.elm.innerText = newVnode.text

            for (let i = 0; i < newVnode.children.length; i++) {
                const vnode = newVnode.children[i];
                let dom = createElement(vnode)
                oldVnode.elm.appendChild(dom)
            }
        }
    }
}