export const def = function (obj, key, value, enumerable) {
    Object.defineProperty(obj, key, {
        enumerable,
        value,
        writable: true,
        configurable: true
    })
}