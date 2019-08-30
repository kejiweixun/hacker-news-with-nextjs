import React from 'react'
import fetchStory from '../lib/fetchStory.js';
import Page from '../components/Page';


const Index = ({ stories }) => {
  return (
      <Page stories={stories} title='Hacker News' />
  )
}

Index.getInitialProps = fetchStory;

export default Index;