class Level {
  private level: number;
  private fullHappy: number;

  constructor(level: number, fullHappy: number) {
    this.level = level;
    this.fullHappy = fullHappy;
  }

  getLevel(): number {
    return this.level;
  }

  getFullHappy(): number {
    return this.fullHappy;
  }
}