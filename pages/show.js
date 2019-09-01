import React from 'react';
import StoryList from '../components/StoryList';
// import getStoryList from '../lib/getStoryList.js';
import fetchStoryList from '../lib/fetchStoryList.js'

const Show = ({ stories }) => <StoryList
  stories={stories}
  title='Show | KeKe News'
/>

Show.getInitialProps = fetchStoryList;

export default Show;
