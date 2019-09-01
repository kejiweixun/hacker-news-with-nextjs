import fetch from 'isomorphic-unfetch';


async function getUserInfo({ query }) {
    const databaseURL = 'https://hacker-news.firebaseio.com/v0';
    const userInfo = await fetch(`${databaseURL}/user/${query.id}.json`)
        .then(res => res.json())

    return { userInfo }
}

export default getUserInfo;