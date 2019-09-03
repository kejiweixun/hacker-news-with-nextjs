import React from 'react';
import Layout from './Layout';
import Story from './Story';
import { useRouter } from 'next/router';

function StoryList({ stories, title, user }) {
  const path = useRouter().pathname;
  const pageQuery = useRouter().query.p;
  const pageNum = pageQuery ?
    Number(pageQuery) + 1 :
    2;
  const storiesNotDeleted = stories.filter(story => !story.deleted);

  return (
    <>
      <Layout title={title} user={user}>
        <div className='items-container'>
          {
            storiesNotDeleted.map((story, index) => <Story
              story={story}
              index={index}
              key={story.id}
              pageNum={pageNum}
            />)
          }
        
        </div>
        {
            stories.length < 30 ?
            null :
              <div className='more'>
                  <a href={`${path}?p=${pageNum}`}>
                    More
                  </a>
              </div> 
          }
      </Layout>
      <style jsx>{`
        .items-container {
          margin: 1rem 1rem 1rem 0;
          display: grid;
          grid-template-columns: minmax(2rem, 4rem) minmax(auto, auto);
        }
        .more {
          margin: 0 0 2rem 4rem;
        }
        .more a {
          font-size: 1.5rem;
          color: black;
          text-decoration: none;
        }
        .more a:visited {
          color: #828284;
        }
    `}</style>
    </>
  )
}

export default StoryList;
