import {DataTypes, sequelize} from '../database/database.config.js';

const InterestModel = sequelize.define(
    'Interest',
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
    },
    {
        tableName: 'interests',
        timestamps: false, // відключення генерації полів createdAt і updatedAt
    },
);

export default InterestModel;