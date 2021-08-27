class Image {
  private characterType: number;
  private cardId: number;
  private imageURLs: [string];

  constructor(characterType: number, cardId: number, imageURLs: [string])  {
    this.characterType = characterType;
    this.cardId = cardId;
    this.imageURLs = imageURLs;
  }

  getCharacterType(): number {return this.characterType;}
  getCardId(): number {return this.cardId;}
  getImageURLs(): [string] {return this.imageURLs;}
}