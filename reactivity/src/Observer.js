// Observer： 将对象转换为响应式对象

import defineReactive from './defineReactive'
import { def } from './utils';

export default class Observer {
    constructor (data) {
        console.log('实例化Observer类');
        // 将响应式的实例作为__ob__属性值挂在data上
        def(data, '__ob__', this, false)
        // console.log(data);
        this.forEach(data)
    }
    forEach(data){
        for (const key in data) {
            console.log('定义响应式对象', data[key]);
            // 定义响应式对象
            defineReactive(data, key)
        }
    }
}