import fetch from 'isomorphic-unfetch';

async function fetchItem({ query }) {

    const databaseURL = 'https://hacker-news.firebaseio.com/v0';


    function getTitleAndId(id) {
        return fetch(`${databaseURL}/item/${id}.json`)
            .then(res => res.json())
            .then(item => {
                if (item.parent) {
                    return getTitleAndId(item.parent)
                } else {
                    const belongToStory = item.title;
                    const storyId = item.id;
                    return { belongToStory, storyId }
                }
            })
    };
    const { belongToStory, storyId } = await getTitleAndId(query.id);

    function getItem(itemId) {
        return fetch(`${databaseURL}/item/${itemId}.json`)
            .then(res => res.json())
            .then(item => {
                if (!item) {
                    // sometimes item will return null, 
                    // e.g. id=20824713
                    item = { deleted: true, id: item.id }
                };
                if (item.type === 'comment') {
                    item.belongToStory = belongToStory;
                    item.storyId = storyId;
                };
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

    };

    const item = await getItem(query.id);
    return { item }
}

export default fetchItem;