import { Skin } from '../../models/Skin';

console.log("======Create Skin Table======");

const createSkinTable = async() => {
    await Skin.sync({force : false})
    .then(() => {
        console.log("Success Create Skin Table");
    })
    .catch((err) => {
        console.log("Error in Create Skin Table : ", err);
    })
}

createSkinTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/Skin.ts