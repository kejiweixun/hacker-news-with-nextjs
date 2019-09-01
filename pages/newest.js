import React from 'react';
import StoryList from '../components/StoryList';
// import getStoryList from '../lib/getStoryList.js';
import fetchStoryList from '../lib/fetchStoryList.js'

const Newest = ({stories}) => <StoryList
stories={stories}
title='Newest | KeKe News'
/>
 
Newest.getInitialProps = fetchStoryList;

export default Newest;
