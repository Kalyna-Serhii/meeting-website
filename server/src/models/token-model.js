import {DataTypes, sequelize} from '../database/database.config.js';
import UserModel from './user-model.js';

const TokenModel = sequelize.define(
    'Token',
    {
        userId: {
            type: DataTypes.INTEGER(),
            allowNull: false,
        },
        refreshToken: {
            type: DataTypes.TEXT(),
            allowNull: false,
        },
    },
    {
        tableName: 'tokens',
        timestamps: false, // відключення генерації полів createdAt і updatedAt
    },
);

TokenModel.belongsTo(UserModel, {foreignKey: 'userId'});

export default TokenModel;