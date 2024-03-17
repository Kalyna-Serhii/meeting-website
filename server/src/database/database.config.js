import {DataTypes, Sequelize} from 'sequelize';
import setTestData from "./setTestData.js";

const NAME = process.env.DATABASE_NAME;
const USERNAME = process.env.DATABASE_USERNAME;
const PASSWORD = process.env.DATABASE_PASSWORD;
const HOST = process.env.DATABASE_HOST;
const PORT = process.env.DATABASE_PORT;

const sequelize = new Sequelize(NAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    port: PORT,
    logging: false, // відключення виведення SQL запитів до терміналу
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Не вдалося підключитися до бази даних:', error);
    }
    try {
        await sequelize.sync({alter: true});
        // await sequelize.sync({ force: true, paranoid: true });
        // Примусово оновлює БД, ФОРМАТУЮЧИ її
    } catch (error) {
        console.error('Не вдалося виконати синхронізацію в базі даних:', error);
    } try {
        await setTestData();
    } catch (error) {
        console.error('Не вдалося внести тестові дані', error);
    }
})();

export {DataTypes, sequelize};