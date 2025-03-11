"use strict";

import * as fs from 'fs'
import {Stdt, ForeignStud} from "./exercise3.mjs";


export class Prmtn{
    constructor(){
        this.students = [];
    }

    add(student){
        this.students.push(student);
    }

    size(){
        return this.students.length;
    }

    get(i){
        return this.students[i];
    }

    print(){
        let str = "";
	for (let i = 0; i < this.size(); i++){
	    str += this.get(i).toString()
	    if (i < this.size() - 1){
		str += "\n";
	    }
	}
	console.log(str);
	return str;
    }

    write(){
        return JSON.stringify(this.students);
    }

    read(json){
	let prmt = JSON.parse(json);
	for (let student of prmt){
	    if (student.nationality != undefined){
	        student = Object.assign(new ForeignStud(), student);		
	    } else {
	        student = Object.assign(new Stdt(), student);
	    }
	    this.add(student);
	}
    }

    saveToFile(fileName){
        fs.writeFileSync(fileName, this.write());
    }

    readFromFile(fileName){
        this.read(fs.readFileSync(fileName))
    }
}
