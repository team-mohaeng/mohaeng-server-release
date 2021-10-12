"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = void 0;
class Level {
    constructor(level, fullHappy, cardId) {
        this.level = level;
        this.fullHappy = fullHappy;
        this.cardId = cardId;
    }
    getCardId() { return this.cardId; }
    getLevel() { return this.level; }
    getFullHappy() { return this.fullHappy; }
}
exports.Level = Level;
//# sourceMappingURL=Level.js.map