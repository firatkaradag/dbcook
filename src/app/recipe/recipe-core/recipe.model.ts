export class Recipe {

  public id: string;
  public author: string;
  public title: string;
  public content: string;
  public abstract: string;
  public cover: string;
  public thumbnail: string;
  public images: string[];
  public badges: string;
  public type: string;
  public createdAt: Date;
  public updatedAt: Date;
  public show: boolean;
  public labels: string[];

  constructor(public data:any = {}) {

    if (data.id) this.id = data.id;
    if (data.createdAt) this.createdAt = data.createdAt;
    if (data.updatedAt) this.updatedAt = data.updatedAt;

    this.author = data.author ? data.author : "";
    this.title = data.title ? data.title : "";
    this.content = data.content ? data.content : "";
    this.abstract = data.abstract ? data.abstract : "";
    this.cover = data.cover ? data.cover : "";
    this.thumbnail = data.thumbnail ? data.thumbnail : "";
    this.images = data.images ? data.images : [];
    this.type = data.type ? data.type : "";
    this.badges = data.badges ? data.badges : "";

    this.show = false;
    this.labels = this.badges.trim().split(',');

    delete this.data;
  }
}
