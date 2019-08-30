import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import * as firebase from 'firebase/app';
import 'firebase/database';

function User(props) {
    const { id, created, karma, about } = props.userInfo;
    const createdDate = new Date(created * 1000).toLocaleDateString().replace('-','年').replace('-','月').replace('/','年').replace('/','月').replace(/(.+)/, '$1日');
    return (
        <>
            <Layout title={`user: ${id}`}>
                <table>
                    <tbody>
                    <tr className='user'>
                        <td>user:</td>
                        <td>{id}</td>
                    </tr>
                    <tr className='user-created'>
                        <td>created:</td>
                        <td>{createdDate}</td>
                    </tr>
                    <tr className='user-karma'>
                        <td>karma:</td>
                        <td>{karma}</td>
                    </tr>
                    <tr className='user-about'>
                        <td>about:</td>
                        <td dangerouslySetInnerHTML={{ __html: about }} style={{ verticalAlign: 'text-top' }} />
                    </tr>
                    <tr className='user-submitted'>
                        <td></td>
                        <td><Link href={`/submitted?id=${id}`}><a>submitted stories</a></Link></td>
                    </tr>
                    </tbody>
                </table>
            </Layout>

            <style jsx>{`
            table {
                font-size: 1.4rem;
                color: #828284;
            }
            .user-created td:last-child{
                color: black;
            }
            tr td:last-child {
                padding-left: 1rem;
            }
            .user-submitted {
                height: 10rem;
            }
            .user-submitted a {
                color: black;
            }
            .user-submitted a:visited {
                color: #828284;
            }
        `}</style>
        </>
    )
}

User.getInitialProps = async ({ query }) => {
    const firebaseConfig = {
        databaseURL: 'https://hacker-news.firebaseio.com',
    }
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }
    const userInfo = await firebase.database().ref('v0').child(`user/${query.id}`).once('value').then(snap => snap.val());

    return { userInfo }
}

export default User;

