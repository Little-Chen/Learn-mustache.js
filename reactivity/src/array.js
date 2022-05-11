import { def } from "./utils"

const arrayProto = Array.prototype
export const __arrayProto__ = Object.create(arrayProto)

const arrayMethods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'splice',
    'sort',
    'reverse'
]

// 遍历重写数组原型上的7个方法
arrayMethods.forEach(methodName => {
    const origin = arrayProto[methodName]
    // 重写__arrayProto__下的7种数组操作方法, 变为响应式
    def(__arrayProto__, methodName, function () {
        // 此时this指向方法调用的具体对象
        console.log('调用重写数组方法：'+ methodName);

        const ob = this.__ob__
        const args = [...arguments]
        // const args = Array.apply(null, arguments)

        let insertVal = []  // 插入的新值

        // push、unshift、splice方法支持插入新值到数组，需要单独处理
        switch(methodName) {
            case 'push':
            case 'unshift':
                insertVal = arguments
                break;
            case 'splice':
                insertVal = arguments.slice(2)
                break;
        }
        // 如果存在插入值，需要将插入值变为响应式属性
        if(insertVal) {
            ob.observeArray(insertVal)
        }

        // 保持原功能
        return origin.apply(this, arguments)
    }, false)
})

