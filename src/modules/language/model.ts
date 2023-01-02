import mongo, { model } from 'mongoose';

import { DB_Module } from '../../core';
import { Instance, IModel, ISchema, LANGUAGES_LEVEL } from './interface';
import { Entity } from './entity';

const Schema = new mongo.Schema<ISchema, IModel>(
  {
    name: { type: String, required: true, immutable: true },
    level: { type: String, enum: Object.values(LANGUAGES_LEVEL), required: true },
    userId: { type: mongo.Schema.Types.ObjectId, immutable: true, required: true },
  },
  {
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at' },
  },
);

Schema.statics['addition'] = async function (entity: Entity): Promise<Instance> {
  const model: Instance = new Model({
    name: entity.name,
    level: entity.level,
    userId: entity.userId,
  });

  return model.save();
};

export const Model: IModel = model<Instance, IModel>(DB_Module.LANGUAGE, Schema, DB_Module.LANGUAGES);
