import { gql } from 'apollo-server-express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers';

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        mail: String!
    }

    input UsersInput {
        ids: [ID!]!
    }

    type AuthPayload {
        token: String!
        user: User!
    }

    type Query {
        getUser(id: String!): User
        getUsers(input: UsersInput!): [User]!
        me: User
    }

    type Mutation {
        registerUser(name: String, mail: String!, password: String!): AuthPayload!
        updateUser(name: String, mail: String, password: String): User
        login(mail: String!, password: String!): AuthPayload!
        deleteUser(id: String): String
    }
`;

const userSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export { userSchema }