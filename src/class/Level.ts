export class Level {
  private level: number;
  private fullHappy: number;
  private cardId: number; //다음 레벨에서 얻게 되는 카드

  constructor(level: number, fullHappy: number, cardId?: number) {
    this.level = level;
    this.fullHappy = fullHappy;
    this.cardId = cardId;
  }
  
  getCardId(): number {return this.cardId;}
  getLevel(): number {return this.level;}
  getFullHappy(): number {return this.fullHappy;}
}