import mongo, { model } from 'mongoose';

import { DB_Module } from '../../core';
import { Instance, IModel, ISchema } from './interface';

import { Entity } from './entity';

const Schema = new mongo.Schema<ISchema, IModel>(
  {
    userId: { type: mongo.Schema.Types.ObjectId, immutable: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    start_duration: { type: String, required: true },
    end_duration: { type: String, required: true },
    position: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  {
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at' },
  },
);

Schema.statics['addition'] = async function (entity: Entity): Promise<Instance> {
  const model: Instance = new Model({
    name: entity.name,
    description: entity.description,
    position: entity.position,
    status: entity.status,
    link: entity.link,
    start_duration: entity.start_duration,
    end_duration: entity.end_duration,
    userId: entity.userId,
  });

  return model.save();
};

export const Model: IModel = model<Instance, IModel>(DB_Module.PLACE_WORK, Schema, DB_Module.PLACE_WORKS);
