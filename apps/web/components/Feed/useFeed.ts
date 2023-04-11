import gql from 'graphql-tag';
import { fromWsClientSubscription } from '../../lib/fromWsClientSubscription';
import { useSubscription } from '../../lib/useSubscription';
import { createClient } from 'graphql-ws';
import { WebSocket } from 'ws';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { AllFeedQuery, FeedSubscription } from '../../types/gen/graphql-types';
import { getFeed } from '../../lib/loaders/getFeed';

const client = createClient({ url: 'ws://localhost:4000/graphql', webSocketImpl: WebSocket });

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
    queryFn: getFeed,
    staleTime: Infinity,
  });

  useSubscription(
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