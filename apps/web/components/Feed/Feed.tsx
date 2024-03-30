import styles from './Feed.module.scss';
import { Avatar, List } from 'antd';
import { useFeed } from './useFeed';

export const Feed: React.FC = () => {
  const { data } = useFeed();

  if (!data) {
    return null;
  }

  return (
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
  );
}
