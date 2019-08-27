import React from 'react';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Link from 'next/link'

function User(props) {
    const { id, created, karma, about, submitted } = props.userInfo;
    const createdTime = (new Date(created * 1000)).toLocaleDateString();
    return (
        <>
            <Layout title={`user: ${id}`}>
                <table>
                    <tr className='user'>
                        <td>user:</td>
                        <td>{id}</td>
                    </tr>
                    <tr className='created'>
                        <td>created:</td>
                        <td>{createdTime}</td>
                    </tr>
                    <tr className='karma'>
                        <td>karma:</td>
                        <td>{karma}</td>
                    </tr>
                    <tr className='about'>
                        <td>about:</td>
                        <td>{about}</td>
                    </tr>
                    <tr className='submitted'>
                        <td></td>
                        <td><Link href='/submitted' as={`/submitted?id=${id}`}><a>submitted</a></Link></td>
                    </tr>
                </table>
            </Layout>

            <style jsx>{`
            table {
                font-size: 1.4rem;
                color: #828284;
            }
            .created td:last-child{
                color: black;
            }
            tr td:last-child {
                padding-left: 1rem;
            }
            .submitted a {
                color: black;
            }
            .submitted a:visited {
                color: #828284;
            }
        `}</style>
        </>
    )
}

User.getInitialProps = async ({ query }) => {
    const res = await fetch(`https://hacker-news.firebaseio.com/v0/user/${query.id}.json`);
    const userInfo = await res.json();
    return ({
        userInfo: userInfo
    })
}



export default User;

