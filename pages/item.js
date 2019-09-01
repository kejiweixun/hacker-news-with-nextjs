import React from 'react';
import CommentItem from '../components/CommentItem';
import StoryItem from '../components/StoryItem';
import getIten from '../lib/getItem.js'
// import fetchItem from '../lib/fetchItem.js'

function Item({ item }) {
    if (item.type === 'comment') {
        return <CommentItem item={item} />
    } else {
        return <StoryItem item={item} />
    }
}

Item.getInitialProps = getIten;

export default Item;
