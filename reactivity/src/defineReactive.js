import { observe } from './observe'

export default function defineReactive (data, key, val) {
    if(arguments.length == 2) {
        val = data[key]
    }

    let childOjb = observe(val)

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: () => {
            console.log('key为：'+key,'访问值:', JSON.stringify(val));
            return val
        },
        set: (newVal) => {
            console.log('key为：'+key,'设置值:', JSON.stringify(newVal));
            if(newVal === val) {
                return
            }

            val = newVal

            childOjb = observe(newVal)   
            
        }
    })
}
