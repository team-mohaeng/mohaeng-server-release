import { CompleteChallenge } from '../../models/CompleteChallenge';

console.log("======Create CompleteChallenge Table======");

const createCompleteChallengeTable = async() => {
    await CompleteChallenge.sync({force : false})
    .then(() => {
        console.log("Success Create CompleteChallenge Table");
    })
    .catch((err) => {
        console.log("Error in Create CompleteChallenge Table : ", err);
    })
}

createCompleteChallengeTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/CompleteChallenge.ts