import {DataTypes, sequelize} from '../database/database.config.js';

const UserModel = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('man', 'woman'),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photoLink: {
            type: DataTypes.STRING,
        },
        interests: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: [],
        },
    },
    {
        tableName: 'users',
        timestamps: false, // відключення генерації полів createdAt і updatedAt
    },
);

export default UserModel;