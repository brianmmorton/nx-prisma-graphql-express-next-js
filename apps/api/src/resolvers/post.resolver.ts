import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  FieldResolver,
  Root,
  Int,
  InputType,
  Field,
  Publisher,
  PubSub,
} from 'type-graphql';
import { Post } from './post.types';
import { User } from './user.types';
import { Context } from '../context';

@InputType()
export class PostCreateInput {
  @Field()
  title: string

  @Field({ nullable: true })
  content: string
}

export enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver()
  author(@Root() post: Post, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .author()
  }

  @Query((returns) => Post, { nullable: true })
  async postById(@Arg('id') id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.findUnique({
      where: { id },
    })
  }

  @Mutation((returns) => Post)
  async createDraft(
    @Arg('data') data: PostCreateInput,
    @Arg('authorEmail') authorEmail: string,
    @PubSub('ON_FEED_UPDATED') publish: Publisher<Post>,
    @Ctx() ctx: Context,
  ) {
    const result = await ctx.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        author: {
          connect: { email: authorEmail },
        },
      },
    });

    publish(result);

    return result;
  }

  @Mutation((returns) => Post, { nullable: true })
  async togglePublishPost(
    @Arg('id', (type) => Int) id: number,
    @Ctx() ctx: Context,
  ) {
    const post = await ctx.prisma.post.findUnique({
      where: { id: id || undefined },
      select: {
        published: true,
      },
    })

    return ctx.prisma.post.update({
      where: { id: id || undefined },
      data: { published: !post?.published },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async incrementPostViewCount(
    @Arg('id', (type) => Int) id: number,
    @Ctx() ctx: Context,
  ) {
    return ctx.prisma.post.update({
      where: { id: id || undefined },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    })
  }

  @Mutation((returns) => Post, { nullable: true })
  async deletePost(@Arg('id', (type) => Int) id: number, @Ctx() ctx: Context) {
    return ctx.prisma.post.delete({
      where: {
        id,
      },
    })
  }
}