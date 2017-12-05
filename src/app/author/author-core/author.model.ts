export class Author {

  public id: string;
  public email: string;
  public password: string;
  public name: string;
  public picture: string;
  public createdAt: string;
  public role: string;

  constructor(public data:any = {}) {

    if (data.id) this.id = data.id;
    if (data.password) this.password = data.password;
    if (data.createdAt) this.createdAt = data.createdAt;

    this.email = data.email ? data.email : '';
    this.name = data.name ? data.name : '';
    this.picture = data.picture ? data.picture : '';
    this.role = data.role ? data.role : '';

    delete this.data;
  }
}
