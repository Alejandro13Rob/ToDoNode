import * as fs from 'fs';
import * as path from 'path';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { dataLoaders } from './models/dataloaders';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './graphql/todos/resolvers';
import { typeDefs } from './graphql/todos/typeDefs';
import { mongoConnect } from './datasources/mongoConnect';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const serverConfig: ApolloServerExpressConfig = {
    schema,
    context: async() => {
      const loaders = await dataLoaders();

      return { loaders };
    },
};

export { serverConfig };
