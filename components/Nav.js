import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default (props) => {
    const router = useRouter();
    const path = router.pathname;
    const userStyle = {
        color: 'white',
        paddingLeft: '1rem',
        fontSize: '1.4rem'
    };
    const newStyle = {
        color: `${path === '/newest' ? 'white' : ''}`
    }
    const askStyle = {
        color: `${path === '/ask' ? 'white' : ''}`
    }
    const showStyle = {
        color: `${path === '/show' ? 'white' : ''}`
    }
    const jobsStyle = {
        color: `${path === '/jobs' ? 'white' : ''}`
    }

    return (
        <>
            <div className='nav-container-logo-text'>
                <Link href='/'>
                    <a className='nav-logo'>
                        <img src='/static/logo.gif' />
                    </a>
                </Link>

                <div className='nav-container-text'>
                    <header>
                        <Link href='/'>
                            <a>Hacker News</a>
                        </Link>
                    </header>
                    <nav>
                        <ul>
                            <li>
                                <Link href='/newest'>
                                    <a style={newStyle}>
                                        new
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/ask'>
                                    <a style={askStyle}>
                                        ask
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/show'>
                                    <a style={showStyle}>
                                        show
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href='/jobs'>
                                    <a style={jobsStyle}>
                                        jobs
                                    </a>
                                </Link>
                            </li>
                            {
                                props.user ?
                                    <li style={userStyle}>
                                        {props.user}
                                    </li> :
                                    ''
                            }
                        </ul>
                    </nav>
                </div>
            </div>
            <style jsx>{`

            .nav-container-logo-text {
                display: flex;
                align-items: center;
                align-items: center;
                background: #ff6600;
                padding-left: 3px;
            }
            .nav-container-text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
            }
            img {
                width: 1.8rem;
                height: 1.8rem;
                display: block;
                border: 1px solid white;
            }
            header {
                font-weight: bold;
                font-size: 1.6rem;
                margin: 0.4rem 0 0 0;
                padding: 0;
                line-height: 1.2;
                margin-left: 1rem;
            }
            nav {
                margin-left: 1rem;
            }
            ul {
                list-style-type: none;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                padding: 0;
                margin: 0 0 0.4rem  0;
            }
            li {
                font-weight: 400;
                font-size: 1.2rem;
                padding: 0 0.6rem;
                margin: 0;
                line-height: 1;
                border-right: 1px solid black;
            }
            li:first-child {
                padding-left: 0;
            }
            li:last-child {
                border: none;
            }
            a {
                text-decoration: none;
                color: black;
            }

            @media(min-width: 750px){
                .nav-container-logo-text {
                    display: flex;
                    align-items: center;
                    height: 2.5rem;
                    background: #ff6600;
                }
                .nav-container-logo-text a {
                 color: black;
                 text-decoration: none;
                 }
                .nav-logo {
                     line-height: 0;
                     margin: 0;
                }
                .nav-logo img {
                 border: 1px solid white;
                }
                .nav-container-text {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                header {
                    margin: 0;
                    line-height; 1;
                    font-size: 1.5rem;
                    font-weight: 700;
                    margin-left: 1rem;
                }
                nav ul {
                 display: flex;
                 list-style-type: none;
                 line-height: 1;
                 margin: 0;
             }
                nav ul li {
                    font-size: 1.4rem;
                    padding: 0 1rem;
                    border-right: 1px solid black;
                }
                nav ul li:last-child {
                 border-right: none;
             }
                nav ul li a{
                    display: inline-block;
                    line-height: 1;
             }
             }
            
        `}</style>
        </>
    )
}
