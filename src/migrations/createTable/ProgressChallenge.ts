import { ProgressChallenge } from '../../models/ProgressChallenge';

console.log("======Create ProgressChallenge Table======");

const createProgressChallengeTable = async() => {
    await ProgressChallenge.sync({force : false})
    .then(() => {
        console.log("Success Create ProgressChallenge Table");
    })
    .catch((err) => {
        console.log("Error in Create ProgressChallenge Table : ", err);
    })
}

createProgressChallengeTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/ProgressChallenge.ts