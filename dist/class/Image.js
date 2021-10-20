"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    constructor(characterType, cardId, lottieURL, profileURL, imageURLs) {
        this.characterType = characterType;
        this.cardId = cardId;
        this.lottieURL = lottieURL;
        this.profileURL = profileURL;
        this.imageURLs = imageURLs;
    }
    getCharacterType() { return this.characterType; }
    getCardId() { return this.cardId; }
    getLottieURL() { return this.lottieURL; }
    getProfileURL() { return this.profileURL; }
    getImageURLs() { return this.imageURLs; }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map