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
                            const value = snap.val();
                            if (value.type == 'comment') {
                                return getTitleAndId(value.parent)
                            } else {
                                const belongToStory = value.title;
                                const belongToStoryId = value.id;
                                return { belongToStory, belongToStoryId }
                            }
                        })
                }

                const { belongToStory, belongToStoryId } = await getTitleAndId(itemId);
                function getItem(id) {
                    return db.child(`item/${id}`)
                        .once('value')
                        .then(snap => {
                            const value = snap.val();
                            // if (!value) {
                            //     value = { deleted: true, id: id };
                            // }
                            if (value.kids) {
                                return Promise.all(value.kids.map(getItem))
                                    .then(res => {
                                        value.comment = res;
                                        value.belongToStory = belongToStory;
                                        value.belongToStoryId = belongToStoryId;
                                        return value;
                                    })
                            } else {
                                value.comment = [];
                                value.belongToStory = belongToStory;
                                value.belongToStoryId = belongToStoryId;
                                return value;
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
