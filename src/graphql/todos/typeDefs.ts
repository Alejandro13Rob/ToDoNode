import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';

const typeDefs = gql`
    type List {
        id: String!
        title: String!
        items(title: String): [Item]
    }

    type Item {
        id: String!
        title: String!
        description: String
    }

    type Query {
        getList: [Item]
        getItem(id: String!): Item
    }

    type Mutation {
        createItem(title: String!, description: String): Item
        updateItem(id: String!, title: String, description: String): Item
        deleteItem(id: String!): String
    }
`;

const todoSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { todoSchema }