export class CharacterCard {
  private id: number;
  private previewURL: string;
  private imageURL: string;

  constructor(id: number, previewURL: string, imageURL: string) {
    this.id = id;
    this.previewURL = previewURL;
    this.imageURL = imageURL;
  }

  getId(): number { return this.id; }
  getPreviewURL(): string { return this.previewURL };
  getImageURL(): string {return this.imageURL;}
}