import React from 'react';
import Layout from '../components/Layout';
import Story from './Story';

function StoryCsr({stories, pageNum}){
  return (
    <Layout title='Ask | Hacker News'>
      <div className='items-container'>
        {
          stories.map((story, index) => {
            return <Story
              story={story}
              index={index}
              key={story.id}
              pageNum={pageNum}
            />
          })
        }
        {stories.length < 30 ?
          null :
          <div className='more'>
              <a href={`askcsr?p=${pageNum}`}>
                More
              </a>
          </div>
        }

      </div>
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
      .more {
        margin: 2rem 0 2rem 4rem;
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
    </Layout>
  )
}

export default StoryCsr;