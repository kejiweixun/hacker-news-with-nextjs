import React from 'react';
import Layout from '../components/Layout';
import Story from '../components/Story';

function Page({stories, title, user}) {
  return (
    <>
    <Layout title={title} user={user}>
      <div className='items-container'>
      {stories.map((story, index) => <Story story={story} index={index} key={story.id}/>)}
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



export default Page;