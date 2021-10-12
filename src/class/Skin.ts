export class Skin {
  private id: number;
  private imageURL: string;

  constructor(id: number, imageURL: string) {
    this.id = id;
    this.imageURL = imageURL;
  }

  getId(): number {return this.id;}
  getImageURL(): string {return this.imageURL;}
}