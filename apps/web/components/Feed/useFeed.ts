import gql from 'graphql-tag';
import { fromWsClientSubscription } from '../../lib/fromWsClientSubscription';
import { useSubscription } from '../../lib/useSubscription';
import { createClient } from 'graphql-ws';
import { WebSocket } from 'ws';
import request from 'graphql-request'
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { AllFeedQuery, FeedSubscription } from '../../types/gen/graphql-types';

const client = createClient({ url: 'ws://localhost:4000/graphql', webSocketImpl: WebSocket });

export const FEED_QUERY = gql`
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
`

export const FEED_SUBSCRIPTION = gql`
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
`

export const useFeed = () => {
  const queryClient = useQueryClient()

  const { data } = useQuery<AllFeedQuery>({
    queryKey: ['feed'],
    queryFn: async () =>
      request(
        'http://localhost:4000/graphql',
        FEED_QUERY,
        { first: 10 },
      ),
  });

  const { data: onFeedUpdated } = useSubscription(
    ['onFeedUpdated'],
    () => fromWsClientSubscription<FeedSubscription>(client, {
      query: `
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
      `,
      variables: {},
    }),
    {
      onData(data) {
        queryClient.setQueryData<AllFeedQuery>(['feed'], (oldData) => ({
          feed: [...oldData.feed, data.onFeedUpdated]
        }))
      }
    }
  );

  return {
    data,
  }
}