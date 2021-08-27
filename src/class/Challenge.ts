class Challenge {
  private day: number;
  private title: string;
  private description: string;
  private beforeMent: string;
  private afterMent: string;
  private happy: number;
  private badgeId: number;

  constructor(day: number, title: string, description: string, 
    beforeMent: string, afterMent: string, happy: number, badgeId: number) {
      this.day = day;
      this.title = title;
      this.description = description;
      this.beforeMent = beforeMent;
      this.afterMent = afterMent;
      this.happy = happy;
      this.badgeId = badgeId;
  }

  getDay(): number {return this.day;}
  getTitle(): string {return this.title;}
  getDescription(): string {return this.description;}
  getBeforeMent(): string {return this.beforeMent;}
  getAfterMent(): string {return this.afterMent;}
  getHappy(): number {return this.happy;}
  getBadgeId(): number {return this.badgeId}
}