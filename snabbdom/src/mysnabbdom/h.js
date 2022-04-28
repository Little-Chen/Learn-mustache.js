import vnode from './vnode'
/**
 * 
 * @param {选择器标签} sel 
 * @param {数据} data 
 * @param {第三参数} c 
 * @returns 
 */
export default function (sel, data, c) {
    // 检查参数个数
    if(arguments.length != 3){
        throw new Error ('对不起,h函数必须传三个参数')
    }

    // 检查参数c的类型
    if(typeof c === 'string' ||  typeof c === 'number'){
        // 参数类型一:h(sel, data, '文字或数字')
        return vnode(sel, data, undefined, c, undefined)
    } else if(Array.isArray(c)){
        // 参数类型二:h(sel, data, [])
        let children = []
        for (let i = 0; i < c.length; i++) {
            const node = c[i];
            if(typeof node !== 'object' || !node.hasOwnProperty('sel')){
                throw new Error ('传入子节点中存在格式错误,请确认使用h函数')
            }
            children.push(node)
        }

        return vnode(sel, data, children, undefined, undefined)
    } else if(typeof c === 'object' && c.hasOwnProperty('sel')) {
        // 参数类型三:h(sel, data, h()) 
        let children = [c]

        return vnode(sel, data, children, undefined, undefined)
    } else {
        throw new Error('传入的第三参数有误')
    }
}