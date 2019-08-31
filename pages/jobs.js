import React from 'react';
import StoryList from '../components/StoryList';
import getStoryList from '../lib/getStoryList.js'

const Job = ({ stories }) => <StoryList
  stories={stories}
  title='Jobs | KeKe News'
/>

Job.getInitialProps = getStoryList;

export default Job;
