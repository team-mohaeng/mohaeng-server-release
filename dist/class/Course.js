"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
class Course {
    constructor(id, property, title, description, totalDays, happy, challenges) {
        this.id = id;
        this.property = property;
        this.title = title;
        this.description = description;
        this.totalDays = totalDays;
        this.happy = happy;
        this.challenges = challenges;
    }
    getId() { return this.id; }
    getProperty() { return this.property; }
    getTitle() { return this.title; }
    getDescription() { return this.description; }
    getTotalDays() { return this.totalDays; }
    getHappy() { return this.happy; }
    getChallenges() { return this.challenges; }
}
exports.Course = Course;
//# sourceMappingURL=Course.js.map