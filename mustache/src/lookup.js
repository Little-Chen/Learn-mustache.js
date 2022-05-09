/**
 * 循环剥洋葱法找到数据源中对应属性值
 * @param {数据对象} dataObj 
 * @param {变量名} keyName 
 * @returns 对应属性值
 */
export default function lookup (dataObj, keyName) {

    if(keyName.indexOf('.') != -1 && keyName != '.'){
        // 将.获取属性转化为数组
        var keys = keyName.split('.')
        var temp = dataObj
        // 设置一个临时变量，剥洋葱法获取最终值
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            temp = temp[key] // 一层层获取值，存入临时变量中
        }
        return temp
    }else{
        return dataObj[keyName]
    }
}