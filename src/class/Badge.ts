/* 뱃지 클래스 */
class Badge {
  // 아이디, 이름, 획득방법, AWS S3 이미지 URL
  private id: number;
  private name: string;
  private howObtain: string;
  private imageURL: string;

  constructor(id: number, name: string, howObtain: string, imageURL: string) {
    this.id = id;
    this.name = name;
    this.howObtain = howObtain;
    this.imageURL = imageURL;
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getHowObtain() {
    return this.howObtain;
  }

  public getImageURL() {
    return this.imageURL;
  }
}