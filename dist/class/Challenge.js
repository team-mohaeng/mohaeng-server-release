"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge = void 0;
class Challenge {
    constructor(day, title, beforeMent, afterMent, happy) {
        this.day = day;
        this.title = title;
        this.beforeMent = beforeMent;
        this.afterMent = afterMent;
        this.happy = happy;
    }
    getDay() { return this.day; }
    getTitle() { return this.title; }
    getBeforeMent() { return this.beforeMent; }
    getAfterMent() { return this.afterMent; }
    getHappy() { return this.happy; }
}
exports.Challenge = Challenge;
//# sourceMappingURL=Challenge.js.map