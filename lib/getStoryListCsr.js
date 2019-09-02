import firebase from 'firebase/app';
import 'firebase/database';

async function getStoryList({ pathname, query }) {
  const pageNum = query.p ? query.p : 1;
  const start = 30 * (pageNum - 1)
  const end = 30 * pageNum;

  if (!firebase.apps.length) {
    firebase.initializeApp({
      databaseURL: 'https://hacker-news.firebaseio.com',
    })
  }
  const db = firebase.database().ref('v0');

  const child = pathname === '/jobs' ?
    'jobstories' :
    pathname === '/newest' ?
      'newstories' :
      pathname === '/ask' ?
        'askstories' :
        pathname === '/show' ?
          'showstories' :
          pathname === '/' ?
            'topstories' :
            pathname === '/submitted' ?
              `user/${query.id}` :
              '';

  let storiesIds = [];

  if (child === `user/${query.id}`) {
    storiesIds = await db.child(child)
      .once('value')
      .then(snap =>
        snap.val()
          .submitted
          .slice(start, end)
      )
  } else {
    storiesIds = await db.child(child)
      .once('value')
      .then(snap =>
        snap.val()
          .slice(start, end)
      )
  }

  const stories = await Promise.all(storiesIds.map(id => {
    return db.child(`item/${id}`)
      .once('value')
      .then(snap => {
        if (snap.val()) {
          return snap.val()
        } else {
          return { deleted: true, id: id }
        }
      })
  }))

  return { stories }
}

export default getStoryList;