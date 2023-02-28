import { PrismaClient } from '@prisma/client'
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { pubsub } from './pubsub'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  pubsub: RedisPubSub
}

export const context: Context = {
  prisma: prisma,
  pubsub,
}