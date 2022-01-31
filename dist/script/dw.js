function calcultion(a, b) { 
    let c = a ** b;
    return c;
}
const que1 = {
    a: 5,
    b: 2,
}
let ans = calcultion.call(que1);  // call
console.log(ans);   // display ans