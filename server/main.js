#!/usr/bin/node
/*
The main loop for the server
*/

class BallGame {
    constructor(name) {
        this.name = name;
        console.log(this.test);
    }
    get test () {
        return `This is a test string. My name is ${this.name}`;
    }
}
let bGame = new BallGame('SERVER');