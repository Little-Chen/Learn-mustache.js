import { observe } from './observe';

var obj = {
    a: 1,
    b: {
        c: {
            d: 3
        }
    }
}

observe(obj)

obj.b.c.d = 5
console.log(obj);