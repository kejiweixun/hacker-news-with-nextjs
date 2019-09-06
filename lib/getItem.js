import firebase from 'firebase/app';
import 'firebase/database';

async function getItem({ query }) {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            databaseURL: 'https://hacker-news.firebaseio.com',
        });
    };

    const db = firebase.database().ref('v0');

    function getTitleAndId(id) {
        return db.child(`item/${id}`)
            .once('value')
            .then(snap => {
                const item = snap.val();
                if (item) {
                    if (item.parent) {
                        return getTitleAndId(item.parent);
                    } else {
                        const belongToStory = item.title;
                        const storyId = item.id;
                        return { belongToStory, storyId }
                    }
                } else {
                    return {}
                }
            })
    };

    const { belongToStory, storyId } = await getTitleAndId(query.id);

        function getItem(id) {
            return db.child(`item/${id}`)
                .once('value')
                .then(snap => {
                    let item = snap.val();
                    if (!item) {
                        // sometimes item will return null, 
                        item = { deleted: true }
                    };
                    if (item.type === 'comment') {
                        item.belongToStory = belongToStory;
                        item.storyId = storyId;
                    }
                    if(item.descendants > 100){
                        if (item.kids) {
                            const start = (query.p ? (query.p - 1) : 0) * 5;
                            const end = (query.p ? query.p : 1) * 5;
                            return Promise.all(item.kids.slice(start, end).map(getItem))
                                .then(res => {
                                    item.comment = res;
                                    return item;
                                })
                        } else {
                            item.comment = [];
                            return item;
                        }
                    } else {
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
                    }
                })
        };
        const item = await getItem(query.id);
        return { item }
   
}

export default getItem;