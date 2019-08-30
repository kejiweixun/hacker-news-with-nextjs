import React from 'react';
import CommentItem from '../components/CommentItem';
import StoryItem from '../components/StoryItem';
import getItem from '../lib/getItem.js'

function Item(props) {
    if (props.item.type === 'comment') {
        return <CommentItem item={props.item} />
    } else {
        return <StoryItem item={props.item} />
    }
}

Item.getInitialProps = getItem;

export default Item;