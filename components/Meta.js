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
        }
      `}</style>
   </>
  )
}