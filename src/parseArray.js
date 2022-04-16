import renderTemplate from "./renderTemplate";

/**
 * 遍历渲染数组类型的模板片段，拼接到模板字符串中
 * 渲染仍交由renderTemplate完成，此处存在互相调用
 * @param {数组对应tokens} tokenArr 
 * @param {数组对应数据源} dataObj 
 * @returns 
 */
export default function parseArray (tokenArr, dataObj) {
    var resStr = ''
    console.log(tokenArr, dataObj);
    if(Array.isArray(tokenArr)){
        // 遍历的次数，此时应该由数据源数组的项数决定
        for (let i = 0; i < dataObj.length; i++) {
            const data = dataObj[i];
            // 支持{{.}}渲染数组简单项，需在对象上扩展一个'.'属性，值等于本身
            resStr += renderTemplate(tokenArr, {
                ...data,
                '.': data
            })
        }
    }
    return resStr
}