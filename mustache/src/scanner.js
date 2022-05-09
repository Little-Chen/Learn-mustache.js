/**
 * 扫描器类
 * @param {String} templateStr  模板字符串
 * @param {Array} data 模板中可能用到的数据
 */
export default class Scanner {
    constructor (templateStr, data) {
        this.templateStr = templateStr
        this.data = data
        this.pos = 0 // 初始化指针
        this.tail = this.templateStr.substr(this.pos) // 初始化尾巴字符串
    }   

    // 扫描stopTag标识符，并记录到stopTag为止，走过的内容
    scanUtil(stopTag){
        var pos_backup = this.pos
        while(!this.eos() && this.tail.indexOf(stopTag) !== 0){
            this.pos++
            this.tail = this.templateStr.substr(this.pos)
        }
        return this.templateStr.substring(pos_backup, this.pos)
    }

    // 跳过tag标识符
    scan(tag){
        if(this.tail.indexOf(tag) === 0){
            var pos_backup = this.pos
            this.pos +=  tag.length
            this.tail =  this.templateStr.substr(this.pos)
            return this.templateStr.substring(pos_backup, this.pos)
        }
    }

    // 扫描完毕中止条件
    eos () {
        return this.pos >= this.templateStr.length
    }
}