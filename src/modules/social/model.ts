import mongo, { model } from 'mongoose';

import { DB_Module } from '../../core';
import { Instance, IModel, ISchema, SOCIAL } from './interface';
import { Entity } from './entity';

const Schema = new mongo.Schema<ISchema, IModel>(
  {
    link: { type: String, required: true },
    name: { type: String, enum: Object.values(SOCIAL), immutable: true, required: true },
    userId: { type: mongo.Schema.Types.ObjectId, immutable: true, required: true },
  },
  {
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at' },
  },
);

Schema.statics['addition'] = async function (entity: Entity): Promise<Instance> {
  const model: Instance = new Model({
    link: entity.link,
    name: entity.name,
    userId: entity.userId,
  });

  return model.save();
};

export const Model: IModel = model<Instance, IModel>(DB_Module.SOCIAL, Schema, DB_Module.SOCIALS);
