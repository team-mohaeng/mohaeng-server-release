import { Challenge } from "./Challenge";

export class Course {
  private id: number;
  private property: number;
  private title: string;
  private description: string;
  private totalDays: number;
  private happy: number;
  private challenges: Challenge[];

  constructor(id: number, property: number, title: string, description: string,
    totalDays: number, happy: number, challenges: Challenge[]) {
      this.id = id;
      this.property = property;
      this.title = title;
      this.description = description;
      this.totalDays = totalDays;
      this.happy = happy;
      this.challenges = challenges;
  }

  getId(): number {return this.id;}
  getProperty(): number {return this.property;}
  getTitle(): string {return this.title;}
  getDescription(): string {return this.description;}
  getTotalDays(): number {return this.totalDays;}
  getHappy(): number {return this.happy;}
  getChallenges(): Challenge[] {return this.challenges;}
}