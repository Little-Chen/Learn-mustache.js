// Observer： 将对象转换为响应式对象

import defineReactive from './defineReactive'
import { def } from './utils';
import { __arrayProto__ } from './Array';
import { observe } from './observe';

export default class Observer {
    constructor (data) {
        console.log('实例化Observer类');
        // 将响应式的实例作为__ob__属性值挂在data上
        def(data, '__ob__', this, false)
        // console.log(data);
        if(Array.isArray(data)) {
            Object.setPrototypeOf(data, __arrayProto__);
            // data.__proto__ = __arrayProto__
        } else {    
            this.forEach(data)
        }
    }
    forEach(data){
        for (const key in data) {
            // 定义响应式对象
            defineReactive(data, key)
        }
    }
    observeArray(data) {
        for (let i = 0; i < data.length; i++) {
            // 数组需要逐项重新observe
            observe(data[i])
        }
    }
}