function merge<T extends object,U extends object>(obj1: T, obj2: U) {
    return {
        ...obj1,
        ...obj2
    }
}
let n1 = {
    name: "Jone"
}, n2 = {
    title: "Doe"
}

function prop<T extends object,K extends keyof T>(obj:T,key:K) {
    return obj[key];
}
console.log(prop(n1,"name"));
