import React from 'react'
import { useRouter } from 'next/router';
import Page from '../components/Page';
import fetchStory from '../lib/fetchStory.js';

function Submitted({stories}) {
  const user = useRouter().query.id;
  const storiesValid = stories.filter(story => story.type !== 'comment' && !story.deleted);

  return  <Page stories={storiesValid} title='user submitted stories' user={user} />
}

Submitted.getInitialProps = fetchStory;

export default Submitted;