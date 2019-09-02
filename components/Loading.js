import React from 'react';
import Layout from '../components/Layout';

function Loading(){
  return <>
  <Layout title='Ask | Hacker News'>
    <p className='loading'>
      Loading...
</p>
  </Layout>
  <style jsx>{`
    .loading {
        font-size: 1.6rem;
        margin-tof: 4rem;
        margin-left: 2rem;
      }
`}</style>
</>
}

export default Loading