import { observe } from './observe';

var obj = {
    a: 1,
    b: {
        c: {
            d: 3
        }
    },
    e:[22,33,44,55]
}

observe(obj)

// obj.b.c.d = 5
// obj.e.push({
//     x:{
//         y: {
//         z:{
//             h: 7
//         }}
//     }
// })
obj.e.push([66,77])
// obj.e.sort()
// console.log(obj.e);
obj.e

