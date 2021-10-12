"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    constructor(characterType, cardId, lottieURL, imageURLs) {
        this.characterType = characterType;
        this.cardId = cardId;
        this.lottieURL = lottieURL;
        this.imageURLs = imageURLs;
    }
    getCharacterType() { return this.characterType; }
    getCardId() { return this.cardId; }
    getLottieURL() { return this.lottieURL; }
    getImageURLs() { return this.imageURLs; }
}
exports.Image = Image;
//# sourceMappingURL=Image.js.map