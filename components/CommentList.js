import React from 'react';
import { useState } from 'react';
import TimeAgo from './TimeAgo';
import {useRouter} from 'next/router';

function CommentsList({ comment }) {
  const [collapse, setCollapse] = useState('');
  const path = useRouter().pathname;
  let count = 1;
  const repliesCount = function (comment) {
    if (comment.kids) {
      count += comment.kids.length;
      comment.comment.forEach(repliesCount)
    }
  };
  //numbers shown on the comment collapse sign
  repliesCount(comment);

  const handleReplyCollapse = (e) => {
    e.preventDefault();
    setCollapse(collapse === 'none' ? '' : 'none')
  }


  return (
    <React.Fragment key={comment.id}>
      {
        <div>
          <div className='comment-user'>
            <div className='comment-arrow' />
            <div>
                <a href={`/user?id=${comment.by}`}>
                  {`${comment.by} `}
                </a>
                <a href={path !=='/itemcsr'?`item?id=${comment.id}`:`itemcsr?id=${comment.id}`}>
                  <TimeAgo time={comment.time} />
                </a>
              <a onClick={handleReplyCollapse}
                href='#'
                className='collapse-sign'>
                <span>{' '}[</span>
                <span>
                  {collapse === 'none' ? `+${count}` : '–'}
                </span>
                <span>]</span>
              </a>
            </div>
          </div>

          <div style={{ display: `${collapse}` }}>
            <div className='comment-text'
              dangerouslySetInnerHTML={{
                __html: `<p>${comment.text}`
              }}
            />
            
            <div style={{ marginLeft: '3rem' }}className='comment-indent-desktop'>
              {
                comment.comment.length ?
                  // some items return null 
                  // e.g. id=20818555
                  (comment.comment.filter(item =>
                    item && !item.deleted
                  )).map(item =>
                    CommentsList({ comment: item })) :
                  ''
              }
            </div>
            <div style={{ marginLeft: '1rem' }}className='comment-indent-mobile'>
              {
                comment.comment.length ?
                  // some items return null 
                  // e.g. id=20818555
                  (comment.comment.filter(item =>
                    item && !item.deleted
                  )).map(item =>
                    CommentsList({ comment: item })) :
                  ''
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
            font-size: 1rem;
            line-height: 1;
            cursor: pointer;
          }
          .comment-indent-desktop {
            display: none;
          }
          .comment-indent-mobile {
            display: block;
          }
          @media(min-width: 750px){
            .comment-indent-desktop {
              display: block;
            }
            .comment-indent-mobile {
              display: none;
            }
          }
        `}</style>
        </div>
      }
    </React.Fragment>
  )
}



export default CommentsList;
