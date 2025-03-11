"use strict";

import {fibonaIt,fiboRec,fibo_arr,fiboMap} from "./exercise1.mjs";
import {WordList, wordCount} from "./exercise2.mjs";
import {Stdt, ForeignStud} from "./exercise3.mjs";
import {Prmtn} from "./exercise4.mjs";


console.log("#################### Exercise 1 ####################");
console.log("========== Iterative ==========");
for (let i = 0; i<9; i++){
    console.log(i, " -> ", fibonaIt(i));
}

console.log("\n========== Recursive ==========");
for (let i = 0; i<9; i++){
    console.log(i, " -> ", fiboRec(i));
}

console.log("\n========== Array ==========");
for (let i = 0; i<9; i++){
    console.log([i, i*2 + 1], " -> ", fibo_arr([i, i*2+1]));
}


console.log("\n\n#################### Exercise 2 ####################");
console.log("========== wordCount ==========");
console.log("\"fish bowl fish bowl fish\" -> ", wordCount("fish bowl fish bowl fish"));

console.log("\n========== WordList ==========");
let wordList = new WordList("fish bowl fish rod bowl spear rod fish spear rod");
console.log("Source string: \"fish bowl fish rod bowl spear rod fish spear rod\"");
console.log("wordCount: ", wordList.wordCount);
console.log("getWords: ", wordList.getWords());
console.log("maxCountWord: ", wordList.maxCountWord());
console.log("minCountWord: ", wordList.minCountWord());
console.log("getCount(\"water\"): ", wordList.getCount("water"));
console.log("getCount(\"fish\"): ", wordList.getCount("fish"));
console.log("applyWordFunc(length):", wordList.getWords(), "-> ", wordList.applyWordFunc(function f (word) {return word.length;}));


console.log("\n\n#################### Exercise 3 ####################");
console.log("========== Student ==========");
let student = new Stdt("Dupont", "Jean", 1835);
console.log(student.toString());

console.log("\n========== Foreign Student ==========");
let foreignStudent = new ForeignStud("Doe", "John", 432, "American");
console.log(foreignStudent.toString());



console.log("\n\n#################### Exercise 4 ####################");
let prmtn = new Prmtn();
prmtn.add(new Stdt("Dupont", "Jean", 1835));
prmtn.add(new ForeignStud("Doe", "John", 432, "American"));
console.log("size:", prmtn.size());
prmtn.print();
console.log("json:\n", prmtn.write());
prmtn.read(prmtn.write());
prmtn.print();
prmtn.saveToFile("test_prmtn.txt");
prmtn.readFromFile("test_prmtn.txt");