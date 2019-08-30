import React from 'react';
import Url from 'url-parse';
import Link from 'next/link';
import TimeAgo from './TimeAgo';
import {useRouter} from 'next/router';

export default (props) => {
    const { by, descendants, score, time, title, url, id } = props.story;
    const storyNum = props.index + 1;
    const visiableUrl = url ? new Url(url).hostname.replace('www.', '') : '';
    const storyLink = url ? `${new Url(url).protocol}//${new Url(url).hostname}` : '';

    const pageQuery = useRouter().query.p;
    const pageNum = pageQuery? Number(pageQuery) + 1 : 2;
    const storyNumOffset = storyNum + 30 * ( pageNum -2 );
    return (
        <>
            <div>
                <p className='item-num'>{storyNumOffset}.</p>
            </div>
            <div>
                <p className='item-title-and-url'>
                    {url? <a className='item-title' href={url}>{title}</a> :
                    <Link href={`item?id=${id}`}><a className='item-title'>{title}</a></Link>}
                    <a className='item-url' href={storyLink}>{visiableUrl}</a>
                </p>
                <div className='item-stat'>
                    <p className='item-point'>
                        {score} points by <Link href={`/user?id=${by}`}><a >{by}</a></Link> <Link href={`/item?id=${id}`}><a><TimeAgo time={time} /></a></Link> | <Link href={`/item?id=${id}`}><a>{descendants} comments</a></Link>
                    </p>
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
            .item-title {
            font-size: 1.6rem;
            padding-right: 0.5rem;
            text-decoration: none;
            color: black;
            }
            .item-title:visited {
                color: #777;
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
            @media(min-width: 750px){
                .item-title {
                    font-size: 1.5rem;
                }
                .item-url {
                    font-size: 1.1rem;
                }
            }

            `}</style>
        </>

    )
}
