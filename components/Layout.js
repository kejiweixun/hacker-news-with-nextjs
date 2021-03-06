import React from 'react';
import Meta from './Meta';
import Nav from './Nav';
import Footer from './Footer';

export default props => {
    return (
        <>
            <Meta title={props.title} />
            <Nav user={props.user} />
            {props.children}
            <Footer />
        </>
    )
}