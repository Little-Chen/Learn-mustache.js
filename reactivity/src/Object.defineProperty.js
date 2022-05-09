var dom = document.getElementById('container')
var obj = {}

// value
Object.defineProperty(obj, 'a', {
    value: 5
})
// writable
Object.defineProperty(obj, 'b', {
    value: 4,
    writable: true
})

obj.a = 1
obj.b = 2

// 需要一个临时变量进行值中转
var val = 3
// get、set
Object.defineProperty(obj, 'c', {
    get: () => {
        console.log('访问值');
        return val
    },
    set: (newVal) => {
        console.log('设置值');
        val = newVal
    }
})

console.log(obj.c);
dom.innerHTML = JSON.stringify(obj.a)
console.log(obj);
