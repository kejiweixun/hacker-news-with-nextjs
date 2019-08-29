import React from 'react';
import Page from '../components/Page';
import fetchStory from '../lib/fetchStory.js'

const Ask = ({stories}) => <Page stories={stories} title='Ask | Hacker News'/>

Ask.getInitialProps = fetchStory;

export default Ask;