import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import TimeAgo from './TimeAgo';

function CommentsList({ comment }) {
  const [collapse, setCollapse] = useState('');
  let count = 1;
  const repliesCount = function (comment) {
    if (comment.kids) {
      count += comment.kids.length;
      comment.comment.forEach(comment => repliesCount(comment))
    }
  };
  repliesCount(comment)

  return (
    <React.Fragment key={comment.id}>
      {
        <div>

          <div className='comment-user'>
            <div className='comment-arrow' />
            <div>
              <Link href={`/user?id=${comment.by}`}><a>{comment.by}</a></Link>{' '}
              <Link href={`/item?id=${comment.id}`}><a><TimeAgo time={comment.time} /></a></Link>{' '}
              <a onClick={(e) => { e.preventDefault(); setCollapse(collapse === 'none' ? '' : 'none') }} href='#'>
                [<span className='collapse-sign'>{collapse === 'none' ? `+${count}` : '-'}</span>]
            </a>
            </div>
          </div>

          <div style={{ display: `${collapse}` }}>
            <div className='comment-text'
              dangerouslySetInnerHTML={{ __html: `<p>${comment.text}` }}
            />
            <div style={{ marginLeft: '3rem' }}>
              {
                comment.comment.length ?
                  //id=20818555 this item has a undefined replies
                  (comment.comment.filter(item => item && !item.deleted)).map(item => CommentsList({ comment: item }))
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
            display: grid;
            grid-template-columns: 1.5rem 1fr;
          }
          .comment-arrow {
            background: url(../static/arrow.gif) no-repeat 0 center;
            width: 2rem;
            height: 2rem;
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



export default CommentsList;