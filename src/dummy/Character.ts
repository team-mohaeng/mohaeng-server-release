import { Character } from "../class/Character";
import { CharacterCard } from "../class/CharacterCard";
import { characterCards } from "../dummy/CharacterCard";

const ducks:Array<CharacterCard> = new Array<CharacterCard>();
const rabbits:Array<CharacterCard> = new Array<CharacterCard>();
const giraffes:Array<CharacterCard> = new Array<CharacterCard>();
const elephants:Array<CharacterCard> = new Array<CharacterCard>();
const squirrels:Array<CharacterCard> = new Array<CharacterCard>();
const bears:Array<CharacterCard> = new Array<CharacterCard>();
const hedgehogs:Array<CharacterCard> = new Array<CharacterCard>();

let i = 1;
for (i; i<10; i++) {
  ducks.push(characterCards[i]);
}

for (i; i<19; i++) {
  rabbits.push(characterCards[i]);
}

for (i; i<28; i++) {
  giraffes.push(characterCards[i]);
}

for (i; i<37; i++) {
  elephants.push(characterCards[i]);
}

for (i; i<46; i++) {
  squirrels.push(characterCards[i]);
}

for (i; i<55; i++) {
  bears.push(characterCards[i]);
}

for (i; i<64; i++) {
  hedgehogs.push(characterCards[i]);
}

export const characters = [
  new Character(1, ducks),
  new Character(2, rabbits),
  new Character(3, giraffes),
  new Character(4, elephants),
  new Character(5, squirrels),
  new Character(6, bears),
  new Character(7, hedgehogs),
]
