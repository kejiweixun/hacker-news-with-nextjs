import React from 'react';


export default ({by, descendants, score, time, title, url}) => {
    return (
        <>
            <div className='item-container'>
                <div>
                    <p className='item-num'>1.</p>
                </div>
                <div>
                    <p className='item-title-and-url'>
                        <a className='item-title'>North American versus European distribution systems (2011)</a>
                        <a className='item-url'>(electrical-engineering-portal.com)</a>
                    </p>
                    <div>
                        <p className='item-stat'>58 points by <a className='item-user'>nabla9</a> <a>3 hours ago</a> | <a>52 comments</a></p>
                    </div>
                </div>
            </div>
        <style jsx>{`
            .item-container {
            display: grid;
            grid-template-columns: 2rem 1fr;
            margin: 0.5rem 0;
            }
            .item-num {
            display: inline;
            font-size: 1.6rem;
            vertical-align: text-top;
            margin-left: 0.5rem;
            color: #828284;
            }
            .item-title-and-url {
            margin: 0
            }
            .item-title{
            font-size: 1.6rem;
            padding-right: 0.5rem;
            }
            .item-url {
            color: #828284;
            }
            .item-stat {
            color: #828284;
            margin: 0;
            }
            `}</style>
        </>

    )
}
