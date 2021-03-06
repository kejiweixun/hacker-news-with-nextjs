import React, { useState } from 'react';
import TimeAgo from '../components/TimeAgo';
import Layout from '../components/Layout';
import CommentsList from './CommentList';
import { useRouter } from 'next/router';

function CommentItem({ item }) {
  const [textareaPlaceholder, setTextareaPlaceholder] = useState('');
  const { by,
    id,
    time,
    text,
    parent,
    belongToStory,
    storyId,
    comment } = item;
  const commentNotDeleted = comment.filter(
    item => !item.deleted
  );
  const path = useRouter().asPath.replace(/&.+/, '');
  const pageNum = useRouter().query.p ? useRouter().query.p + 1 : 2;
  return (
    <Layout title={`${text.slice(0, 20)}... | Hacker News`}>

      <div>
        <div className='item-stat'>
          <p className='item-point'>
            <a href={`/user?id=${by}`}>
              {`${by} `}
            </a>
            <a href={`/item?id=${id}`}>
              <TimeAgo time={time} />
            </a>
            <span>
              {' '}|{' '}
            </span>
            <a href={`item?id=${parent}`}>
              parent
                 </a>
            <span>
              {' '}|{' '}
            </span>
            <a href={`item?id=${storyId}`}>
              {`on: ${belongToStory.slice(0, 40)}...`}
            </a>
          </p>
        </div>
        <div dangerouslySetInnerHTML={{ __html: `<p>${text}` }}
          className='comment-title-text'
          style={{ margin: '1rem' }}
        />
        <div className='comment-form'>
          <form>
            <textarea
              placeholder={textareaPlaceholder} />
            <button type='button' onClick={() =>
              setTextareaPlaceholder("can't post")}>
              add comment
                </button>
          </form>
        </div>
        <div className='all-replies'>
          {
            commentNotDeleted.map(comment =>
              <CommentsList
                comment={comment}
                key={comment.id}
              />)
          }
        </div>
      </div>
      <style jsx>{`
              div {
                  margin: 1rem 2rem;
              }
              .item-point {
              color: #828284;
              margin: 0;
              font-size: 1.2rem;
              padding-left: 1.2rem;
              }
              .item-stat {
                  margin: 0 0 0.4rem 0;
                  background: url(../static/arrow.gif) no-repeat 0 center;
              }
              .item-stat a {
                  color: #828284;
                  text-decoration: none;
              }
              .item-stat a:hover {
                  text-decoration: underline;
              }
              .comment-form {
                  margin: 2rem 0;
                  padding-left: 1rem;
              }
              .comment-form textarea{
                  display: block;
                  border: 1px solid #999;
                  width: 98%;
                  max-width: 50rem;
                  height: 8rem;
                  margin-bottom: 1.5rem;
              }
              .comment-form button {
                  background: white;
                  border-radius: 0.5rem;
                  border: none;
                  box-shadow: 0px 0px 1px;
                  margin-bottom: 6rem;
              }
              .all-replies {
                  margin: 0 0 4rem 0;
              }
              @media(min-width: 750px){
                  .item-point {
                      font-size: 1.1rem;
                  }
              }
              `}</style>
    </Layout>
  )
}

export default CommentItem;
