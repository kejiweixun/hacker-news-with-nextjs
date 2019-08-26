import React from 'react';
import Link from 'next/link'

export default () => {
    return (
        <>
            <div>
                <img src='/static/logo.gif' />
                <div className='nav-container'>
                    <header>
                        <Link href='/'>
                            <a>Hacker News</a>
                        </Link>
                    </header>
                    <nav>
                        <ul>
                            <li><Link href='/new'><a>new</a></Link></li>
                            <li><Link href='/past'><a>past</a></Link></li>
                            <li><Link href='/comments'><a>comments</a></Link></li>
                            <li><Link href='/ask'><a>ask</a></Link></li>
                            <li><Link href='/show'><a>show</a></Link></li>
                            <li><Link href='/jobs'><a>jobs</a></Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
            <style jsx>{`
            div {
                display: flex;
                align-items: center;
                background: #ff6600;
                height: 3.5rem;
            }
            .nav-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
            }
            img {
                width: 1.5rem;
                height: 1.5rem;
                display: block;
                border: 1px solid white;
                margin: 0 0.8rem 0rem 0.4rem;
            }
            header {
                font-weight: bold;
                font-size: 1.6rem;
                margin: 0;
                padding: 0;
                line-height: 1;
            }
            ul {
                list-style-type: none;
                display: flex;
                align-items: center;
                margin: 0;
                padding: 0;
            }
            li {
                font-weight: 500;
                padding: 0 0.5rem;
                margin: 0;
                line-height: 1;
                border-right: 1px solid black;
            }
            li:first-child {
                padding-left: 0;
            }
            li:last-child {
                padding-right: 0;
                border: none;
            }
            a {
                text-decoration: none;
                color: black;
            }
        `}</style>
        </>
    )
}