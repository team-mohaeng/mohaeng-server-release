import { Message } from '../../models/Message';

console.log("======Create Message Table======");

const createMessageTable = async() => {
    await Message.sync({force : false})
    .then(() => {
        console.log("Success Create Message Table");
    })
    .catch((err) => {
        console.log("Error in Create Message Table : ", err);
    })
}

createMessageTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/Message.ts