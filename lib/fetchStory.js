import * as firebase from 'firebase/app';
import 'firebase/database';

async function fetchStory({pathname, query}){
  const firebaseConfi = {
    databaseURL: 'https://hacker-news.firebaseio.com',
  }
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfi)
  }
  const db = firebase.database().ref('v0');

  const child = pathname === '/jobs'? 
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

  if(child === `user/${query.id}`){
    storiesIds = await db.child(child).once('value').then(snap => snap.val().submitted.slice(0, 30))
  } else {
    storiesIds = await db.child(child).once('value').then(snap => snap.val().slice(0, 30))
  }

  const stories = await Promise.all(storiesIds.map(id => {
    return db.child(`item/${id}`).once('value').then(snap => snap.val())
  }))

  return { stories }
}

export default fetchStory;