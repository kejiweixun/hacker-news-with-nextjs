import * as firebase from 'firebase/app';
import 'firebase/database';

async function getUserInfo({ query }){
  const firebaseConfig = {
      databaseURL: 'https://hacker-news.firebaseio.com',
  }
  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
  }
  const userInfo = await firebase.database()
      .ref('v0')
      .child(`user/${query.id}`)
      .once('value')
      .then(snap => snap.val());

  return { userInfo }
}

export default getUserInfo;