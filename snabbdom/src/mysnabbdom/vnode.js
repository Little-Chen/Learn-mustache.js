/**
 * 
 * @param {选择器标签} sel 
 * @param {数据对象} data 
 * @param {子节点} children 
 * @param {节点文本内容} text 
 * @param {挂载节点} elm 
 * @returns 
 */
export default function vnode(sel, data, children, text, elm) {
    return { sel, data, children, text, elm }
}