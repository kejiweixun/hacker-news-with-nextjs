import React from 'react';
import Page from '../components/Page';
import fetchStory from '../lib/fetchStory.js'

const Show = ({stories}) => <Page stories={stories} title='Show | Hacker News'/> 

Show.getInitialProps = fetchStory;

export default Show;