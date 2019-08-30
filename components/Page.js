import React from 'react';
import Layout from '../components/Layout';
import Story from '../components/Story';
import Link from 'next/link';
import { useRouter } from 'next/router';


function Page({ stories, title, user }) {
  const path = useRouter().pathname;
  const pageQuery = useRouter().query.p;
  const pageNum = pageQuery ? Number(pageQuery) + 1 : 2;
  const storiesValidate = stories.filter(story => !story.deleted);
  return (
    <>
      <Layout title={title} user={user}>
        <div className='items-container'>
          {
            storiesValidate.map((story, index) => {
              return <Story story={story} index={index} key={story.id} />
            })
          }
          { stories.length ? 
            <div className='more'>
              <Link href={`${path}?p=${pageNum}`}>
                <a>More</a>
              </Link>
            </div> : ''
          }
        </div>
      </Layout>
      <style jsx>{`
        .items-container {
          margin: 1rem 0;
          display: grid;
          grid-template-columns: minmax(2rem, 4rem) minmax(auto, auto);
        }
        .more a {
          display: block;
          font-size: 1.5rem;
          margin-left: 3rem;
          margin-top: 1rem;
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

export default Page;