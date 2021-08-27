class Character {
  private type: number;
  private cards: [CharacterCard];

  constructor(type: number) {
    this.type = type;
  }

  addCharacterCard(id: number, imageURL: string): void {
    const card = new CharacterCard(id, imageURL);
    this.cards.push(card);
  }

  getType(): number {return this.type;}
  getCards(): [CharacterCard] {return this.cards;}
}