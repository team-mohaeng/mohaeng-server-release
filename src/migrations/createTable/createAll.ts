import { User } from '../../models/User';
import { Skin } from '../../models/Skin';
import { ProgressChallenge } from '../../models/ProgressChallenge';
import { Message } from '../../models/Message';
import { Feed } from '../../models/Feed';
import { Emoji } from '../../models/Emoji';
import { CompleteCourse } from '../../models/CompleteCourse';
import { CompleteChallenge } from '../../models/CompleteChallenge';
import { Character } from '../../models/Character';
import { BeforeChallenge } from "../../models/BeforeChallenge";
import { Badge } from '../../models/Badge';


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

console.log("======Create Feed Table======");

const createFeedTable = async() => {
    await Feed.sync({force : false})
    .then(() => {
        console.log("Success Create Feed Table");
    })
    .catch((err) => {
        console.log("Error in Create Feed Table : ", err);
    })
}

createFeedTable();

console.log("======Create Emoji Table======");

const createEmojiTable = async() => {
    await Emoji.sync({force : false})
    .then(() => {
        console.log("Success Create Emoji Table");
    })
    .catch((err) => {
        console.log("Error in Create Emoji Table : ", err);
    })
}

createEmojiTable();

console.log("======Create CompleteCourse Table======");

const createCompleteCourseTable = async() => {
    await CompleteCourse.sync({force : false})
    .then(() => {
        console.log("Success Create CompleteCourse Table");
    })
    .catch((err) => {
        console.log("Error in Create CompleteCourse Table : ", err);
    })
}

createCompleteCourseTable();


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


console.log("======Create Badge Table======");

const createBadgeTable = async() => {
    await Badge.sync({force : false})
    .then(() => {
        console.log("Success Create Badge Table");
    })
    .catch((err) => {
        console.log("Error in Create Badge Table : ", err);
    })
}

createBadgeTable();