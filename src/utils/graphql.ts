import { DocumentNode, GraphQLSchema, Source } from 'graphql';
import { mergeTypeDefs as gtMergeTypeDefs } from '@graphql-tools/merge';
import { typeDefs } from '../graphql/todos/typeDefs'

const mergeTypeDefs = (
    types: Array<string | Source | DocumentNode | GraphQLSchema>,
): ReturnType<typeof gtMergeTypeDefs> => gtMergeTypeDefs([typeDefs, ...types]);

export { mergeTypeDefs };