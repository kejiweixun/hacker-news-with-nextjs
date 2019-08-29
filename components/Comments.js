import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import TimeAgo from './TimeAgo';

function Comments({ reply, itemId}) {
  const [collapse, setCollapse] = useState('');
let count = 1;
  const repliesCount = function (reply) {
    if (reply.kids) {
      count += reply.kids.length ;
      reply.comment.forEach(comment => repliesCount(comment))
    }
  };
  repliesCount(reply)
  
  return (
    <React.Fragment key={reply.id}>
      {
        <div>
          <div className='comment-user'>
            <Link href={`/user?id=${reply.by}`}><a>{reply.by}</a></Link>{' '}
            <Link href={`/item?id=${itemId}`}><a><TimeAgo time={reply.time} /></a></Link>{' '}
            <span onClick={() => setCollapse(collapse === 'none' ? '' : 'none')}>
              [<span className='collapse-sign'>{collapse === 'none' ? `+${count}` : '-'}</span>]
            </span>
          </div>

          <div style={{ display: `${collapse}` }}>
            <div className='comment-text'
              dangerouslySetInnerHTML={{ __html: `<p>${reply.text}` }}
            />
            <div style={{ marginLeft: '3rem' }}>
              {
                reply.comment.length ?
                  //id=20818555 this item has a undefined replies, have no idea
                  (reply.comment.filter(item => item && !item.deleted)).map(item => Comments({ reply: item, itemId }))
                  : ''
              }
            </div>
          </div>

          <style jsx>{`
          div {
            font-size: 1.4rem;
          }
          .comment-user {
            font-size: 1.0rem;
            margin-top: 1.5rem;
            margin-bottom: 0.3rem;
            background: url(../static/arrow.gif) no-repeat 0 center;
            padding-left: 1.2rem;
          }
          a {
            text-decoration: none;
            color: #828284;
            font-size: 1.2rem;
          }
          a:hover {
            text-decoration: underline;
          }
          span {
            cursor: pointer;
          }
          .collapse-sign {
            color: #828284;
            font-size: 1.1rem;
            line-height: 1rem;
            cursor: pointer;
          }
        `}</style>
        </div>
      }
    </React.Fragment>
  )
}



export default Comments;