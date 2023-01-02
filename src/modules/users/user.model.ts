import { Schema, model } from 'mongoose';

import { DB_Module } from '../../core';
import { IUserSchema, IUserInstance, IUserModel, Role } from './interface';
import { UserEntity } from './user.entity';

const UserSchema = new Schema<IUserSchema, IUserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, immutable: true },
    password: { type: String, required: true },
    roles: { type: [String], enum: Object.values(Role), required: true, default: [Role.USER] },
  },
  {
    timestamps: {
      createdAt: 'create_at',
      updatedAt: 'update_at',
    },
  },
);

UserSchema.statics['addition'] = async function (date: UserEntity): Promise<IUserInstance> {
  const user: IUserInstance = new UserModel({ password: date.password, name: date.name, email: date.email });

  return user.save();
};

export const UserModel: IUserModel = model<IUserInstance, IUserModel>(DB_Module.USER, UserSchema, DB_Module.USERS);
