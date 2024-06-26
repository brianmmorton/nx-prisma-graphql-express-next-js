import styles from './index.module.scss';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Feed } from '../components/Feed';
import { CreatePost } from '../components/CreatePost';
import { getFeed } from '../lib/loaders/getFeed';

export function Index() {
  return (
    <div className={styles.page}>
      <div className={styles.createPost}>
        <CreatePost />
      </div>
      <Feed />
    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();

  queryClient.prefetchQuery(['feed'], getFeed)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Index;
