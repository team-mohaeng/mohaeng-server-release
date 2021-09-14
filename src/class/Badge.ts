/* 뱃지 클래스 */
export class Badge {
  // 아이디, 이름, 획득방법, AWS S3 이미지 URL
  private id: number;
  private name: string;
  private information: string;
  private imageURL: string;

  constructor(id: number, name: string, howObtain: string, imageURL: string) {
    this.id = id;
    this.name = name;
    this.information = howObtain;
    this.imageURL = imageURL;
  }

  getId(): number {return this.id;}
  getName(): string {return this.name;}
  getHowObtain(): string {return this.information;}
  getImageURL(): string {return this.imageURL;}
}