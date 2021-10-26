export class Image {
  private characterType: number;
  private cardId: number;
  private lottieURL: string;
  private profileURL: string;
  private iosImageURLs: string[];
  private aosImageURLs: string[];

  constructor(characterType: number, cardId: number, lottieURL: string, profileURL: string, iosImageURLs: string[], aosImageURLs: string[])  {
    this.characterType = characterType;
    this.cardId = cardId;
    this.lottieURL = lottieURL;
    this.profileURL = profileURL;
    this.iosImageURLs = iosImageURLs;
    this.aosImageURLs = aosImageURLs;
  }

  getCharacterType(): number {return this.characterType;}
  getCardId(): number { return this.cardId; }
  getLottieURL(): string { return this.lottieURL; }
  getProfileURL(): string { return this.profileURL; }
  getIosImageURLs(): string[] { return this.iosImageURLs };
  getAosImageURLs(): string[] { return this.aosImageURLs };
}