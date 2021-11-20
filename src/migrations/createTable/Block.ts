import { Block } from '../../models/Block';

console.log("======Create Block Table======");

const createBlockTable = async() => {
    await Block.sync({force : false})
    .then(() => {
        console.log("Success Create Block Table");
    })
    .catch((err) => {
        console.log("Error in Create Block Table : ", err);
    })
}

createBlockTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/Block.ts