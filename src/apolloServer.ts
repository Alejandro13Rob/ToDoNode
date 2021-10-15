import * as fs from 'fs';
import * as path from 'path';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { resolvers } from './graphql/resolvers';

const typeDefs = fs
  .readFileSync(path.join(__dirname, './graphql/schema.ts'), 'utf8')
  .toString();

const serverConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
};

export { serverConfig };
