class Level {
  private level: number;
  private fullHappy: number;
  private characterType?: number;

  constructor(level: number, fullHappy: number) {
    this.level = level;
    this.fullHappy = fullHappy;
  }

  setCharacterType(type: number) {this.characterType = type;}
  
  getCharacterType(): number {return this.characterType;}
  getLevel(): number {return this.level;}
  getFullHappy(): number {return this.fullHappy;}
}