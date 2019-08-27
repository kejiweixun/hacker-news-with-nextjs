import React from 'react'
import Layout from '../components/Layout';
import Story from '../components/Story';
import fetch from 'isomorphic-unfetch';

const Index = (props) => {
  const storiesComponent = props.top30Stories.map((story, index) => <Story story={story} index={index} />)
  return (
    <>
      <Layout title='Hacker News'>
        <div className='items-container'>
          {storiesComponent}
        </div>
      </Layout>
      <style jsx>{`
        .items-container {
          margin: 1rem 0;
          display: grid;
          grid-template-columns: 2rem minmax(auto, auto);
        }
      `}</style>
    </>
  )
}

Index.getInitialProps = async () => {
  const topStoriesApi = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  const res = await fetch(topStoriesApi);
  const topStoriesIds = await res.json();
  const top30StoriesIds = topStoriesIds.slice(0, 30);
  const promiseArray = top30StoriesIds.map(storyId => {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${storyId}.json`).then(res => res.json())
  });
  const top30Stories = await Promise.all(promiseArray);
  return {
    top30Stories: top30Stories
  }
}

export default Index;
