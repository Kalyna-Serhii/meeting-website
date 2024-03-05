class UserDto {
    id;

    name;

    gender;

    age;

    phone;

    password;

    photoLink;

    interests;

    friends;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.gender = model.gender;
        this.age = model.age;
        this.phone = model.phone;
        this.password = model.password;
        this.photoLink = model.photoLink;
        this.interests = model.interests;
        this.friends = model.friends;
    }
}

export default UserDto;