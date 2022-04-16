export default function NestTokens (tokens) {

    var sections = [] // 作为栈队，记录每层标识符的出入
    var nestTokens,collector;
    nestTokens = collector = [] // 收集每层的内容，并将改变同步到nestTOkens中

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        switch(token[0]) {
            case '#':
                collector.push(token)
                sections.push(token)
                collector = token[2] = []
                break;
            case '/':
                sections.pop()
                collector = sections.length > 0 ? sections[sections.length -1][2] : nestTokens;
                break;

            default:
                collector.push(token)
        }
    }
    
    return nestTokens
}