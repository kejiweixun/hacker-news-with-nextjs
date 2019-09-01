import React from 'react';
import StoryList from '../components/StoryList';
// import getStoryList from '../lib/getStoryList.js';
import fetchStoryList from '../lib/fetchStoryList.js'

const Job = ({ stories }) => <StoryList
  stories={stories}
  title='Jobs | KeKe News'
/>

Job.getInitialProps = fetchStoryList;

export default Job;
