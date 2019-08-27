import React from 'react';
import Layout from '../components/Layout';
import fetch from 'isomorphic-unfetch';
import Url from 'url-parse';
import Link from 'next/link';
import {useRouter} from 'next/router';

function Comment(props) {
    const { by, descendants, kids, score, time, title, url } = props;
    console.log(by, descendants, kids, score, time, title, url);
    const date = new Date(time * 1000).toLocaleDateString();
    const visiableUrl = url? new Url(url).hostname : '';
    const storyLink = url? `${new Url(url).protocol}//${new Url(url).hostname}`:'';
    const router = useRouter();
    const id = router.query.id;
    return (
        <Layout>
            <div>
                <p className='item-title-and-url'>
                    <Link href={url}><a className='item-title'>{title}</a></Link>
                    <Link href={storyLink}><a className='item-url'>{visiableUrl}</a></Link>
                </p>
                <div className='item-stat'>
                    <p className='item-point'>{score} points by <Link href={`/user?id=${by}`}><a >{by}</a></Link> <Link href={`/item?id=${id}`}><a>{date} hours ago</a></Link> | <Link href={`/item?id=${id}`}><a>{descendants} comments</a></Link></p>
                </div>
            </div>
            <style jsx>{`
            .item-title-and-url {
            margin: 0;
            }
            .item-title{
            font-size: 1.6rem;
            padding-right: 0.5rem;
            text-decoration: none;
            color: black;
            }
            .item-url {
            color: #828284;
            text-decoration: none;
            }
            .item-point {
            color: #828284;
            margin: 0;
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

            `}</style>
        </Layout>
    )
}

Comment.getInitialProps = async ({ query }) => {
    const res = await fetch('https://hacker-news.firebaseio.com/v0/item/${query.id}.json');
    const item = await res.json();
    const { by, descendants, kids, score, time, title, url } = item;
    return { by, descendants, kids, score, time, title, url };
}

export default Comment;