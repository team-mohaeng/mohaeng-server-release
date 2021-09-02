export class Challenge {
  private day: number;
  private title: string;
  private beforeMent: string;
  private afterMent: string;
  private happy: number;

  constructor(day: number, title: string,
    beforeMent: string, afterMent: string, happy: number) {
      this.day = day;
      this.title = title;
      this.beforeMent = beforeMent;
      this.afterMent = afterMent;
      this.happy = happy;
  }

  getDay(): number {return this.day;}
  getTitle(): string {return this.title;}
  getBeforeMent(): string {return this.beforeMent;}
  getAfterMent(): string {return this.afterMent;}
  getHappy(): number {return this.happy;}
}