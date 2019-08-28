import React from 'react'
import Layout from '../components/Layout';
import Story from '../components/Story';
import fetch from 'isomorphic-unfetch';
import {useRouter} from 'next/router';

 function Submitted(props){

    const stories = props.submittedStories.filter(story => story.type !== 'comment' && !story.deleted);

    const storiesComponent = stories.map((story, index) => <Story story={story} index={index} />)

    const router = useRouter();
    const q = router.query;
  return (
    <>
      <Layout title={`user submit storires`} user={q.id}>
        <div className='items-container'>
        {storiesComponent}
        </div>
      </Layout>
      <style jsx>{`
        .items-container {
          margin: 1rem 0;
          display: grid;
          grid-template-columns: 3rem minmax(auto, auto);
        }
      `}</style>
    </>
  )
}

Submitted.getInitialProps = async ({query}) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/user/${query.id}.json`);
    const userInfo = await res.json();
  const submittedIds = userInfo.submitted.slice(0, 30);
  const promiseArray = submittedIds.map(submittedId => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${submittedId}.json`).then(res => res.json())
  });
  const submittedStories = await Promise.all(promiseArray);
  return {
    submittedStories: submittedStories
  }
}


export default Submitted;