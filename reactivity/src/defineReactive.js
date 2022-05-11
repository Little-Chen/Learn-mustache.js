import { observe } from './observe'

export default function defineReactive (data, key, val) {
    if(arguments.length == 2) {
        val = data[key]
    }
    console.log('定义响应式对象','key=' + key + '  val=', val);

    let childOjb = observe(val)

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            console.log('访问对象属性','key='+key,'val=',val);
            return val
        },
        set: (newVal) => {
            console.log('设置对象属性','key='+key,'val=', newVal);
            if(newVal === val) {
                return
            }

            val = newVal

            childOjb = observe(newVal)   
            
        }
    })
}
