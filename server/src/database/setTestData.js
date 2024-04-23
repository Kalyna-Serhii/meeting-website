import AuthService from "../services/auth-service.js";
import UserModel from "../models/user-model.js";

const body = [
    {
        name: "Test1",
        gender: "man",
        age: "1",
        phone: "+38(000)-000-00-01",
        password: "12345678",
        interests: '["sport", "music", "cinema", "travel", "animals"]'
    },
    {
        name: "Test2",
        gender: "woman",
        age: "2",
        phone: "+38(000)-000-00-02",
        password: "12345678",
        interests: '["sport", "books", "cinema", "cooking"]'
    },
    {
        name: "Test3",
        gender: "man",
        age: "3",
        phone: "+38(000)-000-00-03",
        password: "12345678",
        interests: '["music", "games", "travel", "cars"]'
    },
    {
        name: "Test4",
        gender: "woman",
        age: "4",
        phone: "+38(000)-000-00-04",
        password: "12345678",
        interests: '["music", "nature", "technology", "cars"]'
    },
    {
        name: "Test5",
        gender: "woman",
        age: "5",
        phone: "+38(000)-000-00-05",
        password: "12345678",
        interests: '["music", "cinema", "animals"]'
    },
    {
        name: "Test6",
        gender: "man",
        age: "6",
        phone: "+38(000)-000-00-06",
        password: "12345678",
        interests: '["cinema", "nature", "travel", "politics"]'
    },
    {
        name: "Test7",
        gender: "man",
        age: "7",
        phone: "+38(000)-000-00-07",
        password: "12345678",
        interests: '["cinema", "nature", "travel", "politics"]'
    },
    {
        name: "Test8",
        gender: "woman",
        age: "8",
        phone: "+38(000)-000-00-08",
        password: "12345678",
        interests: '["cinema", "nature", "travel", "politics"]'
    },
    {
        name: "Test9",
        gender: "man",
        age: "9",
        phone: "+38(000)-000-00-09",
        password: "12345678",
        interests: '["cinema", "nature", "travel", "politics"]'
    },
]

async function setTestData() {
    const users = await UserModel.findAll();
    if (!users.length) {
        for (let i = 0; i < body.length; i++) {
            await AuthService.register(body[i], `Test${i+1}.jpg`)
        }
    }
}

export default setTestData;