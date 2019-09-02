import React, { useState, useEffect } from 'react';
import CommentItem from '../components/CommentItem';
import StoryItem from '../components/StoryItem';
import firebase from 'firebase/app';
import 'firebase/database';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

function Item() {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter()
    const itemId = router.asPath.replace(/\/itemcsr\?id=/, '');

    if (!firebase.apps.length) {
        firebase.initializeApp({
            databaseURL: 'https://hacker-news.firebaseio.com'
        })
    }
    const db = firebase.database().ref('v0');

    useEffect(() => {
        setLoading(true);
        let mount = true;
        if (mount) {
            async function hello() {
                function getTitleAndId(id) {
                    return db.child(`item/${id}`)
                    .once('value')
                    .then(snap => {
                        const item = snap.val();
                        if (item.parent) {
                            return getTitleAndId(item.parent);
                        } else {
                            const belongToStory = item.title;
                            const storyId = item.id;
                            return { belongToStory, storyId }
                        }
                    })
                }

                const { belongToStory, storyId } = await getTitleAndId(itemId);
                function getItem(id) {
                    return db.child(`item/${id}`)
                        .once('value')
                        .then(snap => {
                            let item = snap.val();
                            if (!item) {
                                // sometimes item will return null
                                item = { deleted: true }
                            };
                            if (item.type === 'comment') {
                                item.belongToStory = belongToStory;
                                item.storyId = storyId;
                            }
                            if (item.kids) {
                                return Promise.all(item.kids.map(getItem))
                                    .then(res => {
                                        item.comment = res;
                                        return item;
                                    })
                            } else {
                                item.comment = [];
                                return item;
                            }
                        })
                }

                const result = await getItem(itemId)
                setLoading(false);
                setItem(result);
            }
            hello()
        }

        return () => {
            mount = false;
        }
    }, [itemId])

    if (item) {
        if (loading) {
            return <Loading />
        }
        if (item.type === 'comment') {
            return <CommentItem item={item} />
        } else {
            return <StoryItem item={item} />
        }
    } else {
        return <Loading />
    }

}



export default Item;
