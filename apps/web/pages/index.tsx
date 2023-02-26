import styles from './index.module.scss';
import gql from 'graphql-tag';
import { useCreateDraftMutation, useFeedSubscription, useAllFeedQuery, AllFeedQuery } from '../types/gen/graphql-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import { useCallback, useEffect, useState } from 'react';
import { Button, Input } from '@mui/material';

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

export const CREATE_DRAFT_MUTATION = gql`
  mutation CreateDraft($title: String!, $content: String!, $authorEmail: String!) {
    createDraft(data: { title: $title, content: $content }, authorEmail: $authorEmail) {
      id
    }
  }
`

export function Index() {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { data, subscribeToMore } = useAllFeedQuery();
  const [createDraft] = useCreateDraftMutation();
  useFeedSubscription();

  useEffect(() => {
    subscribeToMore({
      document: FEED_SUBSCRIPTION,
      variables: {},
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        // @ts-expect-error
        const newFeedItem = subscriptionData.data.onFeedUpdated;

        return Object.assign({}, prev, {
          feed: [...prev.feed, newFeedItem]
        });
      }
    })
  }, [])

  const setDraftTitle = useCallback((event) => {
    setTitle(event.target.value);
  }, []);

  const setDraftContent = useCallback((event) => {
    setContent(event.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    createDraft({
      variables: {
        title,
        content,
        authorEmail: 'alice@prisma.io',
      },
    })
  }, [title, content, createDraft])

  return (
    <div className={styles.page}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {data?.feed?.map((item) => (
          <ListItem key={item.id}>
            <ListItemAvatar>
              <Avatar>
                <ImageIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.title}
              secondary={new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeZone: 'US/Pacific' }).format(new Date(item.createdAt))}
            />
          </ListItem>
        ))}
      </List>
      <div>
        <Input type='text' placeholder='Title' onChange={setDraftTitle} />
        <Input type='text' placeholder='Content' onChange={setDraftContent} />
        <Button color='primary' title='Add draft' onClick={onSubmit}>Add Draft</Button>
      </div>
    </div>
  );
}

export default Index;
