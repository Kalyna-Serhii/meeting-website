import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.config.js';
import UserModel from "./user-model.js";

const FriendRequestModel = sequelize.define(
    'FriendRequest',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
            defaultValue: 'pending',
            allowNull: false,
        },
        created: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: 'friend_requests',
        timestamps: false, // відключення генерації полів createdAt і updatedAt
    },
);

FriendRequestModel.belongsTo(UserModel, {foreignKey: 'senderId', onDelete: 'CASCADE'});
FriendRequestModel.belongsTo(UserModel, {foreignKey: 'receiverId', onDelete: 'CASCADE'});

export default FriendRequestModel;
