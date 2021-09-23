"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
/* 뱃지 클래스 */
class Badge {
    constructor(id, name, howObtain, imageURL) {
        this.id = id;
        this.name = name;
        this.information = howObtain;
        this.imageURL = imageURL;
    }
    getId() { return this.id; }
    getName() { return this.name; }
    getHowObtain() { return this.information; }
    getImageURL() { return this.imageURL; }
}
exports.Badge = Badge;
//# sourceMappingURL=Badge.js.map