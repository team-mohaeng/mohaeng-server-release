"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../models/User");
const Skin_1 = require("../../models/Skin");
const ProgressChallenge_1 = require("../../models/ProgressChallenge");
const Message_1 = require("../../models/Message");
const Feed_1 = require("../../models/Feed");
const Emoji_1 = require("../../models/Emoji");
const CompleteCourse_1 = require("../../models/CompleteCourse");
const CompleteChallenge_1 = require("../../models/CompleteChallenge");
const Character_1 = require("../../models/Character");
const BeforeChallenge_1 = require("../../models/BeforeChallenge");
const Badge_1 = require("../../models/Badge");
console.log("======Create User Table======");
const createUserTable = async () => {
    await User_1.User.sync({ force: false })
        .then(() => {
        console.log("Success Create User Table");
    })
        .catch((err) => {
        console.log("Error in Create User Table : ", err);
    });
};
createUserTable();
console.log("======Create Skin Table======");
const createSkinTable = async () => {
    await Skin_1.Skin.sync({ force: false })
        .then(() => {
        console.log("Success Create Skin Table");
    })
        .catch((err) => {
        console.log("Error in Create Skin Table : ", err);
    });
};
createSkinTable();
console.log("======Create ProgressChallenge Table======");
const createProgressChallengeTable = async () => {
    await ProgressChallenge_1.ProgressChallenge.sync({ force: false })
        .then(() => {
        console.log("Success Create ProgressChallenge Table");
    })
        .catch((err) => {
        console.log("Error in Create ProgressChallenge Table : ", err);
    });
};
createProgressChallengeTable();
console.log("======Create Message Table======");
const createMessageTable = async () => {
    await Message_1.Message.sync({ force: false })
        .then(() => {
        console.log("Success Create Message Table");
    })
        .catch((err) => {
        console.log("Error in Create Message Table : ", err);
    });
};
createMessageTable();
console.log("======Create Feed Table======");
const createFeedTable = async () => {
    await Feed_1.Feed.sync({ force: false })
        .then(() => {
        console.log("Success Create Feed Table");
    })
        .catch((err) => {
        console.log("Error in Create Feed Table : ", err);
    });
};
createFeedTable();
console.log("======Create Emoji Table======");
const createEmojiTable = async () => {
    await Emoji_1.Emoji.sync({ force: false })
        .then(() => {
        console.log("Success Create Emoji Table");
    })
        .catch((err) => {
        console.log("Error in Create Emoji Table : ", err);
    });
};
createEmojiTable();
console.log("======Create CompleteCourse Table======");
const createCompleteCourseTable = async () => {
    await CompleteCourse_1.CompleteCourse.sync({ force: false })
        .then(() => {
        console.log("Success Create CompleteCourse Table");
    })
        .catch((err) => {
        console.log("Error in Create CompleteCourse Table : ", err);
    });
};
createCompleteCourseTable();
console.log("======Create CompleteChallenge Table======");
const createCompleteChallengeTable = async () => {
    await CompleteChallenge_1.CompleteChallenge.sync({ force: false })
        .then(() => {
        console.log("Success Create CompleteChallenge Table");
    })
        .catch((err) => {
        console.log("Error in Create CompleteChallenge Table : ", err);
    });
};
createCompleteChallengeTable();
console.log("======Create Character Table======");
const createCharacterTable = async () => {
    await Character_1.Character.sync({ force: false })
        .then(() => {
        console.log("Success Create Character Table");
    })
        .catch((err) => {
        console.log("Error in Create Character Table : ", err);
    });
};
createCharacterTable();
console.log("======Create BeforeChallenge Table======");
const createBeforeChallengeTable = async () => {
    await BeforeChallenge_1.BeforeChallenge.sync({ force: false })
        .then(() => {
        console.log("Success Create BeforeChallenge Table");
    })
        .catch((err) => {
        console.log("Error in Create BeforeChallenge Table : ", err);
    });
};
createBeforeChallengeTable();
console.log("======Create Badge Table======");
const createBadgeTable = async () => {
    await Badge_1.Badge.sync({ force: false })
        .then(() => {
        console.log("Success Create Badge Table");
    })
        .catch((err) => {
        console.log("Error in Create Badge Table : ", err);
    });
};
createBadgeTable();
//# sourceMappingURL=createAll.js.map