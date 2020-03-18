// 
// General functions 
export const firstToUppercase = (string) => {
    return string.replace(/^\w/, c => c.toUpperCase());
}