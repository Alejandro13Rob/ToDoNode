import { ApolloServerExpressConfig } from 'apollo-server-express';
import { dataLoaders } from './models/dataloaders';
import { isAuth } from './utils/isAuth';
import { stitchSchemas } from '@graphql-tools/stitch';
import { todoSchema } from './graphql/todos/typeDefs';
import { userSchema } from './graphql/users/typeDefs';

// setup subschema configurations
const todoSubschema = { schema: todoSchema };
const userSubschema = { schema: userSchema };

// build the combined schema
const gatewaySchema = stitchSchemas({
  subschemas: [
    todoSubschema,
    userSubschema,
  ]
});

const serverConfig: ApolloServerExpressConfig = {
    schema: gatewaySchema,
    context: ({ req }) => {
      const token = req.get('Authorization') || '';
      const user = isAuth(token.replace('Bearer', '').trim());
      return { user }
      
      //const loaders = await dataLoaders();
      //return { loaders };
    },
    introspection: true
};

export { serverConfig };
