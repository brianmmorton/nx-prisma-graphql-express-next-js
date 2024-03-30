import 'reflect-metadata';
import { registerEnumType, buildSchema } from 'type-graphql';
import { PostCreateInput, PostResolver, SortOrder } from './resolvers/post.resolver';
import { UserResolver } from './resolvers/user.resolver';
import { FeedResolver } from './resolvers/feed.resolver';
import { DateTimeResolver } from 'graphql-scalars';
import { context } from './context';
import { GraphQLScalarType } from 'graphql';


import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { WebSocketServer } from 'ws'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { useServer } from 'graphql-ws/lib/use/ws'

const app = express()
const httpServer = createServer(app)

const createApp = async () => {
  registerEnumType(SortOrder, {
    name: 'SortOrder',
  })

  const schema = await buildSchema({
    resolvers: [PostResolver, UserResolver, PostCreateInput, FeedResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
    validate: { forbidUnknownValues: false }
  })

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  /** hand-in created schema and have the WS Server start listening */
  const serverCleanup = useServer(
    {
      schema,
      context,
    },
    wsServer,
  )

  const server = new ApolloServer({
    schema,
    context,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()
  server.applyMiddleware({ app })

  httpServer.listen(4000, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
    console.log(`⏰ Subscriptions ready at ws://localhost:4000/graphql`)
  });
}

createApp();