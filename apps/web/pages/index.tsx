import styles from './index.module.scss';
import gql from 'graphql-tag';
import { useFeedSubscription, useAllFeedQuery, FeedSubscription } from '../types/gen/graphql-types';
import { useEffect } from 'react';
import { Avatar, List } from 'antd';
import { CreatePost } from '../components/CreatePost';

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

export function Index() {
  const { data, subscribeToMore } = useAllFeedQuery();
  useFeedSubscription();

  useEffect(() => {
    subscribeToMore<FeedSubscription>({
      document: FEED_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.onFeedUpdated;

        return Object.assign({}, prev, {
          feed: [...prev.feed, newFeedItem]
        });
      }
    })
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.createPost}>
        <CreatePost />
      </div>
      <div className={styles.posts}>
        <List
          itemLayout="horizontal"
          dataSource={data?.feed}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title={item.title}
                description={item.content.slice(0, 50)}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default Index;
