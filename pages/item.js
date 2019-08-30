import React, { useState } from 'react';
import Layout from '../components/Layout';
import Comments from '../components/Comments';
import TimeAgo from '../components/TimeAgo';
import Url from 'url-parse';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as firebase from 'firebase/app';
import 'firebase/database';

function Item(props) {
    const [textareaPlaceholder, setTextareaPlaceholder] = useState('')
    const { by, descendants, score, time, title, url: storyUrl, comment } = props.story;
    const commentNotDeleted = comment.filter(item => !item.deleted)
    const visiableUrl = storyUrl ? (new Url(storyUrl).hostname).replace('www.', '') : '';
    const storyLink = storyUrl ? `${new Url(storyUrl).protocol}//${new Url(storyUrl).hostname}` : '';
    const router = useRouter();
    const id = router.query.id;
    const pastURL = encodeURI(`https://hn.algolia.com/?query=${title}&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0`);
    const webURL = encodeURI(`https://www.google.com/search?q=${title}`);
    return (
        <Layout title={title}>
            <div>
                <p className='item-title-and-url'>
                    <a className='item-title' href={storyUrl}>{title}</a>
                    <a className='item-url' href={storyLink}>({visiableUrl})</a>
                </p>
                <div className='item-stat'>
                    <p className='item-point'>{score} points by <Link href={`/user?id=${by}`}><a >{by}</a></Link> <Link href={`/item?id=${id}`}><a><TimeAgo time={time} /></a></Link> | <a href={pastURL}>past</a> | <a href={webURL}>web</a> | <Link href={`/item?id=${id}`}><a>{descendants} comments</a></Link></p>
                </div>
                <div className='comment-form'>
                    <form>
                        <textarea
                            placeholder={textareaPlaceholder} />
                        <button type='button' onClick={() => setTextareaPlaceholder("hacker news don't offer post api as far as I know")}>add comment</button>
                    </form>
                </div>
                <div className='all-comment'>
                    {
                        commentNotDeleted.map(reply =>   <Comments reply={reply} itemId={id} key={reply.id} /> )
                    }

                </div>
            </div>
            <style jsx>{`
            div {
                margin: 1rem 2rem;
            }
            .item-title-and-url {
            margin-bottom: 0.3rem;
            }
            .item-title {
            font-size: 1.6rem;
            padding-right: 0.5rem;
            text-decoration: none;
            color: black;
            background: url(../static/arrow.gif) no-repeat 0 center;
            padding-left: 1.2rem;
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
                padding: 0;
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
                margin: 0;
                padding-bottom: 5rem;
            }
            @media(min-width: 750px){
                .item-title {
                    font-size: 1.5rem;
                }
                .item-point {
                    font-size: 1.1rem;
                }
            }
            `}</style>
        </Layout>
    )
}

Item.getInitialProps = async ({ query }) => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            databaseURL: 'https://hacker-news.firebaseio.com',
        });
    };

    function getComment(storyId) {
        return firebase.database().ref('v0')
            .child(`item/${storyId}`)
            .once('value')
            .then(snap => {
                let item = snap.val();
                if (!item) {
                    item = {deleted: true} // sometimes item will be returned null, e.g. id=20824713
                }
                if (item.kids) {
                    return Promise.all(item.kids.map(kid => getComment(kid)))
                        .then(res => {
                            item.comment = res;
                            return item;
                        })
                } else {
                    item.comment = [];
                    return item;
                }
            });
    };


    //https://stackoverflow.com/questions/41905839/fire-promise-all-once-all-nested-promises-have-resolved
    // function getItem(id) {
    //     return firebase.database().ref('v0')
    //         .child(`item/${id}`)
    //         .once('value')
    //         .then(snap => { 
    //             const item = snap.val();
    //             return Promise.all((item.kids || []).map(getItem))
    //                 .then(kidsItems => {
    //                     item.replies = kidsItems;
    //                     return item;
    //                 })
    //         });
    // };

    const story = await getComment(query.id);

    return { story };
}

export default Item;

