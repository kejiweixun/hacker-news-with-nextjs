import React from 'react';
import Url from 'url-parse';
import Link from 'next/link';
import TimeAgo from './TimeAgo';
import { useRouter } from 'next/router';

export default ({ story, index, pageNum }) => {
    const { by,
        descendants,
        score,
        time,
        title,
        url,
        id } = story;
    const storyNum = index + 1;
    console.log(1, 'story.js')
    const { hostname, protocol } = new Url(url);
    const visiableUrl = url ?
        hostname.replace('www.', '') :
        '';
    const storyLink = url ?
        `${protocol}//${hostname}` :
        '';

    const path = useRouter().pathname;
    const storyNumOffset = storyNum + 30 * (pageNum - 2);
    // some item has no descendats property
    // e.g. id = 20846442;
    const commentCount = descendants ? descendants : 0;
    return (
        <>
            <div>
                <p className='item-num'>
                    {`${storyNumOffset}.`}
                </p>
            </div>
            <div>
                <p className='item-title-and-url'>
                    {url ?
                        <a className='item-title' href={url}>
                            {title}
                        </a> :
                        <Link href={path!=='/askcsr'?`item?id=${id}`:`itemcsr?id=${id}`}>
                            <a className='item-title'>
                                {title}
                            </a>
                        </Link>
                    }
                    <a className='item-url' href={storyLink}>
                        {visiableUrl}
                    </a>
                </p>
                {
                    path !== '/jobs' ?
                        <p className='item-point'>
                            <span>
                                {`${score} points by `}
                            </span>
                            <Link href={`/user?id=${by}`}>
                                <a >
                                    {`${by} `}
                                </a>
                            </Link>
                            <Link href={path!=='/askcsr'?`item?id=${id}`:`itemcsr?id=${id}`}>
                                <a>
                                    <TimeAgo time={time} />
                                </a>
                            </Link>
                            <span>
                                {' '}|{' '}
                            </span>
                            <Link href={path!=='/askcsr'?`item?id=${id}`:`itemcsr?id=${id}`}>
                                <a>
                                    {`${commentCount} comments`}
                                </a>
                            </Link>
                        </p>
                        :
                        <p className='item-point'>
                            <Link href={path!=='/askcsr'?`item?id=${id}`:`itemcsr?id=${id}`}>
                                <a>
                                    <TimeAgo time={time} />
                                </a>
                            </Link>
                        </p>
                }

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
            font-size: 1.2rem;
            }
            .item-point {
                margin: 0 0 0.4rem 0;
            }
            .item-point a {
                color: #828284;
                text-decoration: none;
            }
            .item-point a:hover {
                text-decoration: underline;
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
