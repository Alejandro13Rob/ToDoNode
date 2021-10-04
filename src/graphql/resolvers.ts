import { MutationCreateItemArgs, MutationUpdateItemArgs, MutationDeleteItemArgs } from './types'
import * as uuid from 'uuid'

const todoList = require('../../mock_initial_data.json')

export const resolvers = {
    // Return value of parent resolver
    Query: {
        list: () => todoList.items,
    },

    Mutation: {
        createItem(_, { title, description }: MutationCreateItemArgs) {
            const item = { id: uuid.v4(), title, description }
            todoList.items.push(item)
            return item
        },
        updateItem(_, { id, title, description }: MutationUpdateItemArgs) {
            const item = todoList.items.find(i => i.id === id)
            if (item) {
                item.title = title
                item.description = description
                return item
            }
            throw new Error('Id not found');
        },
        deleteItem(_, { id }: MutationDeleteItemArgs) {
            const idx = todoList.items.findIndex(i => i.id === id)
            if (idx !== -1) {
                todoList.items.splice(idx, 1)
                return `Item ${id} deleted with success`
            }
            throw new Error('Id not found');
        }
    }
};