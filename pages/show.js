import React from 'react';
import StoryList from '../components/StoryList';
import getStoryList from '../lib/getStoryList.js';

const Show = ({ stories }) => <StoryList
  stories={stories}
  title='Show | KeKe News'
/>

Show.getInitialProps = getStoryList;

export default Show;
