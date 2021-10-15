import { ApolloServer } from 'apollo-server-express'
import { createServer } from './expressServer';
import { mongoConnect } from './datasources/mongoConnect'
import { serverConfig } from './apolloServer';

async function startApolloServer() {

    const apolloServer = new ApolloServer(serverConfig);
    await apolloServer.start();
    const { app } = createServer();

    apolloServer.applyMiddleware({
        app
    });

    await mongoConnect();

    await new Promise((resolve: any) => app.listen({ port: 4000 }, resolve));
    const homeRoute = `http://localhost:4000${apolloServer.graphqlPath}`;
    const healthCheckURL = `${homeRoute}/.well-known/apollo/server-health`;
    console.log(`Server ready at ${homeRoute}`);
    console.log(`Health check at: ${healthCheckURL}`);
    return { apolloServer, app };
}

startApolloServer();
