"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.characters = void 0;
const Character_1 = require("../class/Character");
const CharacterCard_1 = require("../dummy/CharacterCard");
const ducks = new Array();
const rabbits = new Array();
const giraffes = new Array();
const elephants = new Array();
const squirrels = new Array();
const bears = new Array();
const hedgehogs = new Array();
let i = 1;
for (i; i < 10; i++) {
    ducks.push(CharacterCard_1.characterCards[i]);
}
for (i; i < 19; i++) {
    rabbits.push(CharacterCard_1.characterCards[i]);
}
for (i; i < 28; i++) {
    giraffes.push(CharacterCard_1.characterCards[i]);
}
for (i; i < 37; i++) {
    elephants.push(CharacterCard_1.characterCards[i]);
}
for (i; i < 46; i++) {
    squirrels.push(CharacterCard_1.characterCards[i]);
}
for (i; i < 55; i++) {
    bears.push(CharacterCard_1.characterCards[i]);
}
for (i; i < 64; i++) {
    hedgehogs.push(CharacterCard_1.characterCards[i]);
}
exports.characters = [
    new Character_1.Character(1, ducks),
    new Character_1.Character(2, rabbits),
    new Character_1.Character(3, giraffes),
    new Character_1.Character(4, elephants),
    new Character_1.Character(5, squirrels),
    new Character_1.Character(6, bears),
    new Character_1.Character(7, hedgehogs),
];
//# sourceMappingURL=Character.js.map