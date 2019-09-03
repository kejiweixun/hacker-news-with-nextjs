import React from 'react'
import Head from 'next/head'

export default (props) => {
  return (
    <>
      <Head>
        <title>
          {props.title}
        </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta charSet="utf-8" 
        />
        <link
          rel='shortcut icon'
          href='/static/favicon.ico'
          type='image/x-ico'
        />
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
          box-sizing: border-box;
        }
        // for unknow reason, 
        // use global jsx maybe the best way 
        // to style dangerouslySetInnerHtml
        .comment-text p {
          margin: 0;
          margin-left: 1.2rem;
          margin-bottom: 0.8rem;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .comment-text pre, .comment-title-text pre {
          overflow-x: scroll;
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
        .comment-title-text {
          font-size: 1.4rem;
        }
        .comment-title-text p {
          margin: 0;
          margin-bottom: 0.8rem;
          line-height: 1.3;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .comment-title-text a {
          font-size: 1.3rem;
          color: #222;
        }
        .comment-title-text a:visited {
          color: #888;
        }
        @media(min-width: 750px){
          body {
            width: 84%;
            margin: 1rem auto;
          }
        }
        @media(min-width: 750px){
          .comment-text p {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  )
}
