/**
 * 扫描器类
 */

// export default class Scanner  {
//     constructor(templateStr, data){
//         this.templateStr = templateStr
//         this.pos = 0
//         this.tail = this.templateStr.substr(this.pos)
//     }

//     // 指针扫描字符串，知道遇见目标内容结束，并记录扫描过的内容
//     scanUtil (tag) {
//         const pos_backup = this.pos
//         var str = this.tail
//         while(!this.eos() && this.tail.indexOf(tag) != 0){
//             this.pos++
//             this.tail = this.templateStr.substr(this.pos)
//         }

//         return this.templateStr.substring(pos_backup, this.pos)
//     }
//     // 跳过目标关键字，准备开启下一轮扫描
//     scan (tag) {
//         if(this.tail.indexOf(tag) === 0){
//             this.pos += tag.length
//             this.tail = this.templateStr.substr(this.pos)
//         }
//     }
//     // 指针是否走到结尾
//     eos () {
//         return this.pos >= this.templateStr.length
//     } 
// }


export default class Scanner {
    constructor (templateStr, data) {
        this.templateStr = templateStr
        this.data = data
        this.pos = 0 // 初始化指针
        this.tail = this.templateStr.substr(this.pos) // 初始化尾巴字符串
    }   

    // 扫描标识符，并记录走过内容
    scanUtil(stopTag){
        var pos_backup = this.pos
        while(!this.eos() && this.tail.indexOf(stopTag) !== 0){
            this.pos++
            this.tail = this.templateStr.substr(this.pos)
        }
        return this.templateStr.substring(pos_backup, this.pos)
    }

    // 跳过标识符
    scan(tag){
        if(this.tail.indexOf(tag) === 0){
            var pos_backup = this.pos
            this.pos +=  tag.length
            this.tail =  this.templateStr.substr(this.pos)
            return this.templateStr.substring(pos_backup, this.pos)
        }
    }

    // 查询中止条件
    eos () {
        return this.pos >= this.templateStr.length
    }
}