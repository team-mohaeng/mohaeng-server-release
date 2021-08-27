class Character {
  private type: number;
  private cards: [CharacterCard];

  constructor(type: number, cards: [CharacterCard]) {
    this.type = type;
    this.cards = cards;
  }

  getType(): number {return this.type;}
  getCards(): [CharacterCard] {return this.cards;}
}