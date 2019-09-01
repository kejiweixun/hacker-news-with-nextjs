import React from 'react'
import { useRouter } from 'next/router';
import StoryList from '../components/StoryList';
// import getStoryList from '../lib/getStoryList.js';
import fetchStoryList from '../lib/fetchStoryList.js'

const Submitted = ({ stories }) => {
  const user = useRouter().query.id;
  const storiesValid = stories.filter(
    story => story.type !== 'comment' && !story.deleted
  );

  return <StoryList
    stories={storiesValid}
    title='user submitted stories'
    user={user}
  />
}

Submitted.getInitialProps = fetchStoryList;

export default Submitted;
