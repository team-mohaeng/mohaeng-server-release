import { Character } from '../../models/Character';

console.log("======Create Character Table======");

const createCharacterTable = async() => {
    await Character.sync({force : false})
    .then(() => {
        console.log("Success Create Character Table");
    })
    .catch((err) => {
        console.log("Error in Create Character Table : ", err);
    })
}

createCharacterTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/Character.ts