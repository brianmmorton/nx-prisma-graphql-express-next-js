import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import { pubsub } from './pubsub'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  pubsub: PubSub
}

export const context: Context = {
  prisma: prisma,
  pubsub,
}