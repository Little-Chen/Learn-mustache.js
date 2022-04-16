import lookup from "./lookup";
import parseArray from "./parseArray";

export default function renderTemplate (tokens, data) {
    var resStr = ''
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        
        if(token[0] == 'text'){
            // 普通文本或HTML标签，拼接字符串模板即可
            resStr += token[1]
        } else if(token[0] == 'name') {
            // 变量类型，替换对应数据渲染模板
            resStr += lookup(data, token[1])
        } else if(token[0] == '#') {
            // 数组类型，需要遍历解析数组，递归渲染模板
            var keyName = token[1]
            var dataObj = lookup(data, keyName)
            resStr += parseArray(token[2], dataObj)
        }
    }

    return resStr
}