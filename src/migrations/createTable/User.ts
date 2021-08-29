import { User } from '../../models/User';

console.log("======Create User Table======");

const createUserTable = async() => {
    await User.sync({force : false})
    .then(() => {
        console.log("Success Create User Table");
    })
    .catch((err) => {
        console.log("Error in Create User Table : ", err);
    })
}

createUserTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/User.ts