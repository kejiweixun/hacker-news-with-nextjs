import React from 'react';
import Url from 'url-parse';
import Link from 'next/link'

export default (props) => {
    const { by, descendants, score, time, title, url, id} = props.story;
    const storyNum = props.index + 1;
    const timeAgo = Math.floor((Date.now() / 1000 - time) / 3600);
    const visiableUrl = url? new Url(url).hostname : '';
    const storyLink = url? `${new Url(url).protocol}//${new Url(url).hostname}`:'';
    return (
        <>
            <div>
                <p className='item-num'>{storyNum}.</p>
            </div>
            <div>
                <p className='item-title-and-url'>
                    <Link href={url}><a className='item-title'>{title}</a></Link>
                    <Link href={storyLink}><a className='item-url'>{visiableUrl}</a></Link>
                </p>
                <div className='item-stat'>
    <p className='item-point'>{score} points by <Link href={`/user?id=${by}`}><a >{by}</a></Link> <Link href={`/item?id=${id}`}><a>{timeAgo} hours ago</a></Link> | <Link href={`/item?id=${id}`}><a>{descendants} comments</a></Link></p>
                </div>
            </div>
            <style jsx>{`
            .item-num {
            font-size: 1.4rem;
            vertical-align: text-top;
            text-align: right;
            margin: 0 0.6rem 0 0.3rem;
            color: #828284;
            }
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
        </>

    )
}
