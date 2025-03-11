"use strict";

// for each word within a string, counts the number of occurrences of this word in this string
export function wordCount(str) {
    let res = new Map();
    let words = str.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (res.has(words[i])) {
            res.set(words[i], res.get(words[i]) + 1);
        } else {
            res.set(words[i], 1);
        }
    }
    return res;
}

export class WordList{
    constructor(str){
    	this.wordCount = wordCount(str);
    }
    
    getWords(){
    	return [...new Set(Array.from(this.wordCount.keys()))].sort();
    }

    maxCountWord(){
	let words = this.getWords();
        let maxWord = words[0];
        let maxCount = this.wordCount.get(maxWord);
	for (let i = 1; i < words.length; i++){
	    let curWord = words[i];
	    let curCount = this.wordCount.get(curWord);
            if (curCount > maxCount){
	        maxCount = curCount;
		maxWord = curWord;
	    }
	}
        return maxWord;
    }

    minCountWord(){
        let words = this.getWords();
        let minWord = words[0];
        let minCount = this.wordCount.get(minWord);
        for (let i = 1; i < words.length; i++){
            let curWord = words[i];
            let curCount = this.wordCount.get(curWord);
            if (curCount < minCount){
                minCount = curCount;
                minWord = curWord;
            }
        }
        return minWord;
    }
    
    getCount(word){
    	if (this.wordCount.has(word)) {
            return this.wordCount.get(word);
        } else {
            return 0;
        }
    }

    applyWordFunc(fun){
    	let words = this.getWords();
	return words.map((w) => fun(w));
    }
}
