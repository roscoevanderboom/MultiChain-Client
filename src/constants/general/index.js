// 
// General functions 
export const firstToUppercase = (string) => {
    return string.replace(/^\w/, c => c.toUpperCase());
}
export const add_if_not_included = (array, val) => {
    if (!array.includes(val)) {
        array.push(val)
    }
    return array;
}
export const remove_from_array = (array, value_to_remove) => {
    return array.filter(element => element !== value_to_remove)
}
export const mapFromNumber = (num) => {
    let arr = [];
    for (let i = 0; i < num; ++i) {
        arr.push(i);
    }
    return arr
}