import React from 'react';
import Page from '../components/Page';
import fetchStory from '../lib/fetchStory.js'

const Job = ({stories}) => <Page stories={stories} title='Jobs | Hacker News'/>

Job.getInitialProps = fetchStory;

export default Job;