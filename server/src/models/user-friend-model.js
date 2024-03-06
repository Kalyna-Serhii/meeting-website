import { sequelize } from '../database/database.config.js';
import userModel from "./user-model.js";

const UserFriendModel = sequelize.define(
    'Friends',
    {},
    {
        tableName: 'friends',
        timestamps: false, // відключення генерації полів createdAt і updatedAt
    },
);

userModel.belongsToMany(userModel, {through: UserFriendModel, foreignKey: 'user1Id', as: 'user1', onDelete: 'CASCADE'});
userModel.belongsToMany(userModel, {through: UserFriendModel, foreignKey: 'user2Id', as: 'user2', onDelete: 'CASCADE'});

export default UserFriendModel;