import React from 'react';
import Meta from './Meta';
import Nav from './Nav';

export default (props) => {
    return (
        <>
            <Meta title={props.title} />
            <Nav user={props.user}/>
            {props.children}
        </>
    )
}