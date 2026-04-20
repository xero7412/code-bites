export const DebounceFun = (fn, delay) => {
    let timer = null;
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    } 
}