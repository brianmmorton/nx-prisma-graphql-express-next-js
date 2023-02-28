import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDraft: Post;
  deletePost?: Maybe<Post>;
  incrementPostViewCount?: Maybe<Post>;
  signupUser: User;
  togglePublishPost?: Maybe<Post>;
};


export type MutationCreateDraftArgs = {
  authorEmail: Scalars['String'];
  data: PostCreateInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationIncrementPostViewCountArgs = {
  id: Scalars['Int'];
};


export type MutationSignupUserArgs = {
  data: UserCreateInput;
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  published?: Maybe<Scalars['Boolean']>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
};

export type PostCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PostOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  draftsByUser?: Maybe<Array<Post>>;
  feed: Array<Post>;
  postById?: Maybe<Post>;
};


export type QueryDraftsByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryFeedArgs = {
  orderBy?: InputMaybe<PostOrderByUpdatedAtInput>;
  searchString?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryPostByIdArgs = {
  id: Scalars['Float'];
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Subscription = {
  __typename?: 'Subscription';
  onFeedUpdated: Post;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  posts?: InputMaybe<Array<PostCreateInput>>;
};

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Float']>;
};

export type CreateDraftMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  authorEmail: Scalars['String'];
}>;


export type CreateDraftMutation = { __typename?: 'Mutation', createDraft: { __typename?: 'Post', id: string } };

export type AllFeedQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFeedQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Post', content?: string | null, createdAt: any, id: string, published?: boolean | null, title: string, author?: { __typename?: 'User', id: string, email: string } | null }> };

export type FeedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type FeedSubscription = { __typename?: 'Subscription', onFeedUpdated: { __typename?: 'Post', content?: string | null, createdAt: any, id: string, published?: boolean | null, title: string, author?: { __typename?: 'User', id: string, email: string } | null } };


export const CreateDraftDocument = gql`
    mutation CreateDraft($title: String!, $content: String!, $authorEmail: String!) {
  createDraft(data: {title: $title, content: $content}, authorEmail: $authorEmail) {
    id
  }
}
    `;
export type CreateDraftMutationFn = Apollo.MutationFunction<CreateDraftMutation, CreateDraftMutationVariables>;

/**
 * __useCreateDraftMutation__
 *
 * To run a mutation, you first call `useCreateDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftMutation, { data, loading, error }] = useCreateDraftMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      authorEmail: // value for 'authorEmail'
 *   },
 * });
 */
export function useCreateDraftMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftMutation, CreateDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftMutation, CreateDraftMutationVariables>(CreateDraftDocument, options);
      }
export type CreateDraftMutationHookResult = ReturnType<typeof useCreateDraftMutation>;
export type CreateDraftMutationResult = Apollo.MutationResult<CreateDraftMutation>;
export type CreateDraftMutationOptions = Apollo.BaseMutationOptions<CreateDraftMutation, CreateDraftMutationVariables>;
export const AllFeedDocument = gql`
    query AllFeed {
  feed {
    author {
      id
      email
    }
    content
    createdAt
    id
    published
    title
  }
}
    `;

/**
 * __useAllFeedQuery__
 *
 * To run a query within a React component, call `useAllFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllFeedQuery(baseOptions?: Apollo.QueryHookOptions<AllFeedQuery, AllFeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFeedQuery, AllFeedQueryVariables>(AllFeedDocument, options);
      }
export function useAllFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFeedQuery, AllFeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFeedQuery, AllFeedQueryVariables>(AllFeedDocument, options);
        }
export type AllFeedQueryHookResult = ReturnType<typeof useAllFeedQuery>;
export type AllFeedLazyQueryHookResult = ReturnType<typeof useAllFeedLazyQuery>;
export type AllFeedQueryResult = Apollo.QueryResult<AllFeedQuery, AllFeedQueryVariables>;
export const FeedDocument = gql`
    subscription Feed {
  onFeedUpdated {
    author {
      id
      email
    }
    content
    createdAt
    id
    published
    title
  }
}
    `;

/**
 * __useFeedSubscription__
 *
 * To run a query within a React component, call `useFeedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useFeedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useFeedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<FeedSubscription, FeedSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<FeedSubscription, FeedSubscriptionVariables>(FeedDocument, options);
      }
export type FeedSubscriptionHookResult = ReturnType<typeof useFeedSubscription>;
export type FeedSubscriptionResult = Apollo.SubscriptionResult<FeedSubscription>;