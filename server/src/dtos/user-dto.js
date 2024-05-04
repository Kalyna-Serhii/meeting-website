class UserDto {
  id;

  name;

  gender;

  age;

  photoLink;

  constructor(model) {
    this.id = model.id;
    this.name = model.name;
    this.gender = model.gender;
    this.age = model.age;
    this.photoLink = model.photoLink;
  }
}

export default UserDto;
