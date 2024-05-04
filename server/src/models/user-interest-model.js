import { sequelize } from '../database/database.config.js';
import userModel from './user-model.js';
import interestModel from './interest-model.js';

const UserInterestModel = sequelize.define(
  'UserInterest',
  {},
  {
    tableName: 'user_interests',
    timestamps: false, // відключення генерації полів createdAt і updatedAt
  },
);

userModel.belongsToMany(interestModel, { through: UserInterestModel, onDelete: 'CASCADE' });
interestModel.belongsToMany(userModel, { through: UserInterestModel, onDelete: 'CASCADE' });

export default UserInterestModel;
