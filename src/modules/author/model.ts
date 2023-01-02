import { Schema, model } from 'mongoose';

import { DB_Module } from '../../core';
import { Instance, IModel, ISchema, PrivateData, POSITION, STATUS_JOB } from './interface';
import { Entity } from './entity';

const PrivateDataSchema = new Schema<PrivateData>(
  {
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    photo: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
  },
  { _id: false },
);

const AuthorSchema = new Schema<ISchema, IModel>(
  {
    name: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, immutable: true, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    position: { type: String, enum: Object.values(POSITION), required: true },
    status: { type: String, enum: Object.values(STATUS_JOB), required: true },
    certificates: { type: [String], required: false, default: [] },
    privateData: { type: Schema.Types.Mixed, of: PrivateDataSchema, required: false, default: {} },

    link: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: DB_Module.SOCIAL,
          required: false,
          autopopulate: { select: { __v: 0 }, maxDepth: 2 },
          immutable: true,
        },
      ],
      default: [],
    },

    languages: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: DB_Module.LANGUAGE,
          required: false,
          autopopulate: { select: { __v: 0 }, maxDepth: 2 },
          immutable: true,
        },
      ],
      default: [],
    },

    place_work: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: DB_Module.PLACE_WORK,
          required: false,
          autopopulate: { select: { __v: 0 }, maxDepth: 2 },
          immutable: true,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: { createdAt: 'create_at', updatedAt: 'update_at' },
  },
);

AuthorSchema.statics['addition'] = async function (entity: Entity): Promise<Instance> {
  const model: Instance = new Model({
    name: entity.name,
    description: entity.description,
    duration: entity.duration,
    position: entity.position,
    status: entity.status,
    privateData: entity.privateData,
    link: entity.link,
    languages: entity.languages,
    place_work: entity.place_work,
    certificates: entity.certificates,
    userId: entity.userId,
  });

  return model.save();
};

export const Model: IModel = model<Instance, IModel>(DB_Module.AUTHOR, AuthorSchema, DB_Module.AUTHORS);
