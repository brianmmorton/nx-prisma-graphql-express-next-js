import 'reflect-metadata';
import {
  Resolver,
  Query,
  Arg,
  Ctx,
  Root,
  Int,
  InputType,
  Field,
  Subscription,
} from 'type-graphql';
import { Post } from './post.types';
import { Context } from '../context';

@InputType()
export class FeedOrderByUpdatedAtInput {
  @Field()
  updatedAt: 'asc' | 'desc'
}

@Resolver()
export class FeedResolver {
  @Query((returns) => [Post])
  async feed(
    @Arg('searchString', { nullable: true }) searchString: string,
    @Arg('skip', (type) => Int, { nullable: true }) skip: number,
    @Arg('take', (type) => Int, { nullable: true }) take: number,
    @Arg('orderBy', { nullable: true }) orderBy: FeedOrderByUpdatedAtInput,
    @Ctx() ctx: Context,
  ) {
    const or = searchString
      ? {
          OR: [
            { title: { contains: searchString } },
            { content: { contains: searchString } },
          ],
        }
      : {}

    return ctx.prisma.post.findMany({
      where: {
        ...or,
      },
      take: take || undefined,
      skip: skip || undefined,
      orderBy: orderBy || undefined,
    })
  }

  @Subscription(returns => Post, {
    topics: 'ON_FEED_UPDATED',
  })
  async onFeedUpdated(
    @Root() postPayload: Post,
    @Ctx() ctx: Context,
  ) {
    return postPayload;
  }
}