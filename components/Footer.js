import React from 'react';

export default () => {
    return (
        <>
            <footer>
                <p>
                    <span>
                        HN written in Nextjs
                    </span>
                    <span>
                        {' '}|{' '}
                    </span>
                    <span>
                        By{' '}
                    </span>
                    <a href='https://kejiweixun.com'>
                        kejiweixun
                    </a>
                    <span>
                        {' '}|{' '}
                    </span>
                    <a href='https://github.com/kejiweixun/hacker-news-with-nextjs'>
                        GitHub
                    </a>
                </p>
            </footer>
            <style jsx>{`
            footer p {
                border-top: 2px solid  #ff6600;
                font-size: 1.2rem;
                text-align: center;
                padding: 2rem 0;
                margin: 0;
            }
            footer p a {
                color: black;
            }
            footer p a:hover {
                text-decoration: none;
            }
            footer p a:visited {
                text-decoration: none;
                color: #828284;
            }
        `}</style>
        </>
    )
}
