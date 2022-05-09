import Observer from './Observer';

export function observe (data) {
    if(typeof data != 'object') return data
    var ob;

    if(typeof data.__ob__ !== 'undefined') {
        ob = data.__ob__
    } else {
        ob = new Observer(data)
    }

    return ob
}