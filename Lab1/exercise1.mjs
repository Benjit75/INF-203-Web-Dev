"use strict";

// iterative
export function fibonaIt(n) {
    let a = 0;
    let b = 1;
    let tmp = 0;
    for (let i = 0; i<n; i++){
        tmp = a;
	a = b;
	b += tmp;
    }
    return a;
}

// recursive function
export function fiboRec(n) {
    if (n < 2){
        return n;
    }
    return fiboRec(n-1) + fiboRec(n-2);

}

// use a loop
export function fibo_arr(t) {
    let l = t.length;
    let res = [];
    for (let i = 0; i<l; i++){
        res[i] = fiboRec(t[i]);
    }
    return res;
}

// no loop
export function fiboMap(t) {
    return t.map((x) => fiboRec(x));
}
