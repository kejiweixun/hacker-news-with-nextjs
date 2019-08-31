import React from 'react';
import CommentItem from '../components/CommentItem';
import StoryItem from '../components/StoryItem';
import getItem from '../lib/getItem.js'

function Item({ item }) {
    if (item.type === 'comment') {
        return <CommentItem item={item} />
    } else {
        return <StoryItem item={item} />
    }
}

Item.getInitialProps = getItem;

export default Item;
