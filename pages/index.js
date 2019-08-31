import React from 'react';
import StoryList from '../components/StoryList';
import getStoryList from '../lib/getStoryList.js';

const Index = ({ stories }) => <StoryList
  stories={stories}
  title='Hacker News'
/>

Index.getInitialProps = getStoryList;

export default Index;