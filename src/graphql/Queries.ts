import { gql } from '@apollo/client'

export const PodcastQuery = gql`
{
  Podcast {
    title
  }
}
`


const FeedQuery = gql`
{
  episodeFeed(first: 50) {
    id
    title
    audio
    podcast {
      title
    }
  }
}
`
