"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Level = void 0;
class Level {
    constructor(level, fullHappy) {
        this.level = level;
        this.fullHappy = fullHappy;
    }
    setCharacterType(type) { this.characterType = type; }
    getCharacterType() { return this.characterType; }
    getLevel() { return this.level; }
    getFullHappy() { return this.fullHappy; }
}
exports.Level = Level;
//# sourceMappingURL=Level.js.map