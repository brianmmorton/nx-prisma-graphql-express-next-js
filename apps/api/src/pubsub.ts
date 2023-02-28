import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Redis, RedisOptions } from 'ioredis';

const options: RedisOptions = {
  host: process.env.REDIS_DOMAIN_NAME,
  port: process.env.REDIS_PORT_NUMBER,
  retryStrategy: times => {
    // reconnect after
    return Math.min(times * 50, 2000);
  }
};

export const pubsub = new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options)
});