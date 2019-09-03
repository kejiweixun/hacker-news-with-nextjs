import React from 'react';
import StoryList from '../components/StoryList';
import getStoryList from '../lib/getStoryList.js';

const Newest = ({stories}) => <StoryList
stories={stories}
title='Newest | KeKe News'
/>
 
Newest.getInitialProps = getStoryList;

export default Newest;
