"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    constructor(characterType, cardId, lottieURL, profileURL, iosImageURLs, aosImageURLs) {
        this.characterType = characterType;
        this.cardId = cardId;
        this.lottieURL = lottieURL;
        this.profileURL = profileURL;
        this.iosImageURLs = iosImageURLs;
        this.aosImageURLs = aosImageURLs;
    }
    getCharacterType() { return this.characterType; }
    getCardId() { return this.cardId; }
    getLottieURL() { return this.lottieURL; }
    getProfileURL() { return this.profileURL; }
    getIosImageURLs() { return this.iosImageURLs; }
    ;
    getAosImageURLs() { return this.aosImageURLs; }
    ;
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map