import React, {useState}from 'react';
import Layout from '../components/Layout';
import Comments from '../components/Comments';
import Url from 'url-parse';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as firebase from 'firebase/app';
import 'firebase/database';

function Item(props) {
    const [textareaPlaceholder, setTextareaPlaceholder] = useState('')
    const { by, descendants, kids, score, time, title, url:storyUrl, replies} = props.story;
    const repliesNotDeleted = replies.filter(item => !item.deleted)
    const timeAgo = Math.floor((+ new Date() / 1000 - time) / 3600);
    const visiableUrl = storyUrl ? new Url(storyUrl).hostname : '';
    const storyLink = storyUrl ? `${new Url(storyUrl).protocol}//${new Url(storyUrl).hostname}` : '';
    const router = useRouter();
    const id = router.query.id;
    return (
        <Layout title={title}>
            <div>
                <p className='item-title-and-url'>
                    <a className='item-title' href={storyUrl}>{title}</a>
                    <a className='item-url' href={storyLink}>({visiableUrl})</a>
                </p>
                <div className='item-stat'>
                    <p className='item-point'>{score} points by <Link href={`/user?id=${by}`}><a >{by}</a></Link> <Link href={`/item?id=${id}`}><a>{timeAgo} hours ago</a></Link> | <Link href={`/item?id=${id}`}><a>{descendants} comments</a></Link></p>
                </div>
                <div className='comment-form'>
                    <form>
                        <textarea
                        placeholder={textareaPlaceholder}/>
                        <button type='button' onClick={()=>setTextareaPlaceholder("hacker news don't offer post api as far as I know")}>add comment</button>
                    </form>
                </div>
                <div className='all-comment'>
                    {
                        repliesNotDeleted.map(reply =>  <Comments reply={reply} itemId={id} key={reply.id}/>)
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
            .item-title{
            font-size: 1.6rem;
            padding-right: 0.5rem;
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
                height: 10rem;
                line-height: 5rem;
                margin-bottom: 1.5rem;
            }
            .comment-form button {
                border: 1px solid #999;
                background: transparent;
                border-radius: 0.5rem;
            }
            .all-comment {
                margin: 0;
                padding-bottom: 5rem;
            }
            `}</style>
        </Layout>
    )
}

Item.getInitialProps = async ({ query}) => {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            databaseURL: 'https://hacker-news.firebaseio.com',
        });
    }
    const db = firebase.database().ref('v0');
    function getItem(id) {
        return db
            .child(`item/${id}`)
            .once('value')
            .then(snapshot => {
                const val = snapshot.val();
                return Promise.all((val.kids || []).map(getItem))
                    .then(kidsVals => {
                        val.replies = kidsVals? kidsVals:'';
                        console.log(val)
                        return val;
                    })
                    //
                    .catch(e => console.log(e))
            });
    }
    const story = await getItem(query.id)
    return {
        story: story
    }
}

export default Item;