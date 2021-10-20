export class Image {
  private characterType: number;
  private cardId: number;
  private lottieURL: string;
  private profileURL: string;
  private imageURLs: string[];

  constructor(characterType: number, cardId: number, lottieURL: string, profileURL: string, imageURLs: string[])  {
    this.characterType = characterType;
    this.cardId = cardId;
    this.lottieURL = lottieURL;
    this.profileURL = profileURL;
    this.imageURLs = imageURLs;
  }

  getCharacterType(): number {return this.characterType;}
  getCardId(): number { return this.cardId; }
  getLottieURL(): string { return this.lottieURL; }
  getProfileURL(): string { return this.profileURL; }
  getImageURLs(): string[] {return this.imageURLs;}
}