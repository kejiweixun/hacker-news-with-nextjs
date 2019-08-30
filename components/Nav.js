import React from 'react';
import Link from 'next/link'

export default (props) => {
    const listItem = props.user ? <li style={{ color: 'white', paddingLeft: '1rem', fontSize: '1.4rem' }}>{props.user}</li> : '';
    return (
        <>
            <div className='nav-container-logo-text'>
                <Link href='/'>
                    <a className='nav-logo'><img src='/static/logo.gif' /></a>
                </Link>

                <div className='nav-container-text'>
                    <header>
                        <Link href='/'>
                            <a>Hacker News</a>
                        </Link>
                    </header>
                    <nav>
                        <ul>
                            <li><Link href='/newest'><a>new</a></Link></li>
                            <li><Link href='/past'><a>past</a></Link></li>
                            <li><Link href='/comments'><a>comments</a></Link></li>
                            <li><Link href='/ask'><a>ask</a></Link></li>
                            <li><Link href='/show'><a>show</a></Link></li>
                            <li><Link href='/jobs'><a>jobs</a></Link></li>
                            {listItem}
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
                width: 1.6rem;
                height: 1.6rem;
                display: block;
                border: 1px solid white;
            }
            header {
                font-weight: bold;
                font-size: 1.6rem;
                margin: 0.4rem 0 0 0;
                padding: 0;
                line-height: 1.2;
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
                padding: 0 0.5rem;
                margin: 0;
                line-height: 1.2;
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