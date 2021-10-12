export class Image {
  private characterType: number;
  private cardId: number;
  private lottieURL: string;
  private imageURLs: string[];

  constructor(characterType: number, cardId: number, lottieURL: string, imageURLs: string[])  {
    this.characterType = characterType;
    this.cardId = cardId;
    this.lottieURL = lottieURL;
    this.imageURLs = imageURLs;
  }

  getCharacterType(): number {return this.characterType;}
  getCardId(): number { return this.cardId; }
  getLottieURL(): string { return this.lottieURL }
  getImageURLs(): string[] {return this.imageURLs;}
}