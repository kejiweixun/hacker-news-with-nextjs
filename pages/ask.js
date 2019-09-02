import React from 'react';
import StoryList from '../components/StoryList';
import getStoryList from '../lib/getStoryList.js';
// import fetchStoryList from '../lib/fetchStoryList.js'

const Ask = ({ stories }) => <StoryList
  stories={stories} 
  title='Ask | KeKe News'
/>

Ask.getInitialProps = getStoryList;

export default Ask;
