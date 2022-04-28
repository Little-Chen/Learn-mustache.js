import Scanner from './scanner'
import NestTokens from './nestTokens';

/**
 * 将模板转化为字符串
 * @param {String} templateStr 模板字符串
 * @returns {Array} 返回处理好的tokens
 */
export default function ParseTemplateToTokens (templateStr) {
    var tokens = []
    var words;

    // 创建扫描器
    var scanner = new Scanner (templateStr)

    // 扫描字符串模板
    while(!scanner.eos()){
        // 收集开始标签前的内容
        words = scanner.scanUtil('{{').replace(/\s/g, '') // todo 需合理去除空格
        words ? tokens.push(['text', words]) : ''
        scanner.scan("{{")
        // 收集结束标签前的内容
        words = scanner.scanUtil('}}')

        // 约定的api标记处理
        // #：循环开始标签；/:循环结束标签
        if(words[0] == '#'){
            words ? tokens.push(['#', words.substring(1)]) : ''
        } else if(words[0] == '/'){
            words ? tokens.push(['/',  words.substring(1)]) : ''
        } else {
            words ? tokens.push(['name', words]) : ''
        }
        
        scanner.scan("}}")
    }
    return NestTokens(tokens) // 返回嵌套tokens
}