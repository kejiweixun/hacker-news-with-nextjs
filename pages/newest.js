import React from 'react';
import Page from '../components/Page';
import fetchStory from '../lib/fetchStory.js'

function Newest({stories}) {
  return (
    <Page stories={stories} title='Newest | Hacker News'/>
  )
}

Newest.getInitialProps = fetchStory;

export default Newest;