import styles from './index.module.scss';
import gql from 'graphql-tag';
import { useFeedSubscription } from '../types/gen/graphql-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

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
  const { data } = useFeedSubscription();

  return (
    <div className={styles.page}>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {data?.onFeedUpdated?.map((item) => (
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
    </div>
  );
}

export default Index;
