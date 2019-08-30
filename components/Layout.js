import React from 'react';
import Meta from './Meta';
import Nav from './Nav';
import Footer from './Footer';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', url => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


export default (props) => {
    return (
        <>
            <Meta title={props.title} />
            <Nav user={props.user}/>
            {props.children}
            <Footer />
        </>
    )
}