import React, { useState } from 'react';
import URL from 'url-parse';
import { useRouter } from 'next/router';
import TimeAgo from '../components/TimeAgo';
import Layout from '../components/Layout';
import CommentList from './CommentList';

function StoryItem({ item }) {
  const [textareaPlaceholder, setTextareaPlaceholder] = useState('');
  const { by,
    descendants,
    score,
    time,
    title,
    url,
    comment } = item;
  const text = item.text ? item.text : '';
  const commentNotDeleted = comment.filter(item => !item.deleted);
  const { hostname, protocol } = new URL(url);
  const visiableUrl = url ?
    `(${hostname.replace('www.', '')})` :
    '';
  const storyHomepage = url ?
    `${protocol}//${hostname}` :
    '';
  const id = useRouter().query.id;
  const path = useRouter().pathname;
  const pageNum = useRouter().query.p ? Number(useRouter().query.p) + 1 : 2;
  const pastSearch = encodeURI(`https://hn.algolia.com/?query=${title}&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0`);
  const webSearch = encodeURI(`https://www.google.com/search?q=${title}`);

  return (
    <Layout title={title}>
      <div>
        <div className='item-title-and-url'>
          <div className='item-title-arrow' />
          <p>
            <a className='item-title' href={url}>
              {title}
            </a>
            <span>{' '}</span>
            <a className='item-url' href={storyHomepage}>
              {visiableUrl}
            </a>
          </p>
        </div>
        <div className='item-stat'>
          <p className='item-point'>
            <span>{score} points by{' '}</span>
            <a href={`/user?id=${by}`}>
              {by}
            </a>
            <a href={`/item?id=${id}`}>
              {' '}
              <TimeAgo time={time} />
            </a>
            <span>{' '}|{' '}</span>
            <a href={pastSearch}>
              past
            </a>
            <span>{' '}|{' '}</span>
            <a href={webSearch}>
              web
            </a>
            <span>{' '}|{' '}</span>
            <a href={`/item?id=${id}`}>
              {descendants} comments
              </a>
          </p>
        </div>
        <div className='comment-title-text'
          dangerouslySetInnerHTML={{ __html: `<p>${text}` }}
          style={{ margin: '1rem' }}
        />
        <div className='comment-form'>
          <form>
            <textarea
              placeholder={textareaPlaceholder}
            />
            <button type='button' onClick={() =>
              setTextareaPlaceholder("HN post api?")}>
              add comment
            </button>
          </form>
        </div>
        <div className='all-comment'>
          {
            commentNotDeleted.map(comment =>
              <CommentList
                comment={comment}
                key={comment.id}
              />)
          }
          {descendants < 100 ? null :
            <div className='comment-pages'>
              {
                <div className='comment-page'>
                  <a href={`/item?id=${id}`}>
                    第一页
                  </a>
                </div>
              }
              {
                comment.length < 5 ?
                  null :
                  <div className='comment-page'>
                    <a href={`${path}?id=${id}&p=${pageNum}`}>
                      下一页
                    </a>
                  </div>
              }
            </div>
          }
        </div>
      </div>
      <style jsx>{`
          div {
              margin: 1rem 2rem;
          }
          .item-title-and-url {
            margin: 0;
            margin-bottom: 0.3rem;
            display: grid;
            grid-template-columns: 1.5rem 1fr;
          }
          .item-title-arrow {
            margin: 0;
            background: url(../static/arrow.gif) no-repeat 0 center;
          }
          .item-title-and-url p {
            margin: 0;
            padding: 0;
          }
          .item-title {
          font-size: 1.6rem;
          text-decoration: none;
          color: black;
          }
          .item-url {
          color: #828284;
          text-decoration: none;
          font-size: 1.2rem;
          }
          .item-point {
          color: #828284;
          margin: 0;
          font-size: 1.2rem;
          padding-left: 1.2rem;
          }
          .item-stat a {
              color: #828284;
              text-decoration: none;
          }
          .item-stat a:hover {
              text-decoration: underline;
          }
          .item-stat {
              margin: 0 0 0.4rem 0;
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
          .all-comment {
              margin: 0 0 4rem 0;
          }
          .comment-pages {
            display: flex;
            justify-content: center;
            margin: 0 0 2rem 0;
          }
          .comment-page a {
            font-size: 1.3rem;
            color: black;
          }
          .comment-page a:hover {
            text-decoration: none;
          }
          .comment-page a:active {
            text-decoration: none;
          }
          @media(min-width: 750px){
              .item-title {
                  font-size: 1.4rem;
              }
              .item-point {
                  font-size: 1.1rem;
              }
          }
          `}</style>
    </Layout>
  )
}


export default StoryItem;
