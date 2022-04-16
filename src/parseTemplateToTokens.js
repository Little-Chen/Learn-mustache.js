import Scanner from './scanner'
import NestTokens from './nestTokens';

export default function ParseTemplateToTokens (templateStr) {
    var tokens = []

    // 创建扫描器

    var scanner = new Scanner (templateStr)
    var words;
    // 扫描工作
    while(!scanner.eos()){
        // 收集开始标签前的内容
        words = scanner.scanUtil('{{').replace(/\s/g, '') // todo 合理去除空格
        words ? tokens.push(['text', words]) : ''
        scanner.scan("{{")
        // 收集结束标签前的内容
        words = scanner.scanUtil('}}')
        if(words[0] == '#'){
            words ? tokens.push(['#', words.substring(1)]) : ''
        } else if(words[0] == '/'){
            words ? tokens.push(['/',  words.substring(1)]) : ''
        } else {
            words ? tokens.push(['name', words]) : ''
        }
        
        scanner.scan("}}")
    }
    return NestTokens(tokens)
}