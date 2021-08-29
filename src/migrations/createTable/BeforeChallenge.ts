import { BeforeChallenge } from "../../models/BeforeChallenge";

console.log("======Create BeforeChallenge Table======");

const createBeforeChallengeTable = async() => {
    await BeforeChallenge.sync({force : false})
    .then(() => {
        console.log("Success Create BeforeChallenge Table");
    })
    .catch((err) => {
        console.log("Error in Create BeforeChallenge Table : ", err);
    })
}

createBeforeChallengeTable();

//./node_modules/.bin/ts-node ./src/migrations/createTable/BeforeChallenge.ts