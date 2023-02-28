import styles from './index.module.scss';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { Feed } from '../components/Feed';
import { CreatePost } from '../components/CreatePost';

export function Index() {
  return (
    <div className={styles.page}>
      <div className={styles.createPost}>
        <CreatePost />
      </div>
      <div className={styles.posts}>
        <Feed />
      </div>
=    </div>
  );
}

export async function getStaticProps() {
  const queryClient = new QueryClient();
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Index;
