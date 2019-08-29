import React from 'react'
import Head from 'next/head'

export default (props) => {
  return (
    <>
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <style jsx global>{`
        html {
          font-size: 10px;
          margin: 0;
          background: white;
        }
        body {
          margin: 0;
          background: #F6F6F0;
        }
        //for unknow reason, use global jsx is the best way to style dangerouslySetInnerHtml
        .comment-text p {
          margin: 0;
          margin-left: 1.2rem;
          margin-bottom: 0.8rem;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .comment-text a {
          font-size: 1.3rem;
          color: #222;
        }
        .comment-text a:visited {
          color: #888;
        }
        //another dangerouslySetInnerHtml
        .user-about td:last-child p {
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
   </>
  )
}