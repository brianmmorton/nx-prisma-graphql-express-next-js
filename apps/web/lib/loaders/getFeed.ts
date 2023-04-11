import gql from 'graphql-tag';
import request from 'graphql-request'

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

export const getFeed = () =>
  request(
    'http://localhost:4000/graphql',
    FEED_QUERY,
  )
