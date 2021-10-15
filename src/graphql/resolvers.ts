import {
  MutationCreateItemArgs,
  MutationUpdateItemArgs,
  MutationDeleteItemArgs,
} from './types';
import { v4 as uuid } from 'uuid';
import todoModel from '../models/todoModel';

const resolvers = {
  Query: {
    async getList(parent, args) {
      try {
        return await todoModel.find();
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async getItem(parent, args) {
      try {
        const id = args.id;
        return await todoModel.findOne({ id: id });
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    async createItem(_, { title, description }: MutationCreateItemArgs) {
      try {
        const item = { id: uuid(), title, description };
        return await todoModel.create(item);
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async updateItem(_, { id, title, description }: MutationUpdateItemArgs) {
      try {
        const item = await todoModel.findOneAndUpdate(
          { id: id },
          { title, description },
          { new: true }
        );
        if (item) {
          return item;
        } else {
          throw new Error('Id not found');
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
    async deleteItem(_, { id }: MutationDeleteItemArgs) {
      try {
        const item = await todoModel.findOne({ id: id });
        if (item) {
          const deleted = await todoModel.findByIdAndDelete(item);
          return deleted.id;
        } else {
          throw new Error('Id not found');
        }
      } catch (error: any) {
        throw new Error(error);
      }
    },
  },
};

export { resolvers };
