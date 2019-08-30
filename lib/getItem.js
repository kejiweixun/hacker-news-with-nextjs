import * as firebase from 'firebase/app';
import 'firebase/database';

async function getItem({ query }){
  if (!firebase.apps.length) {
      firebase.initializeApp({
          databaseURL: 'https://hacker-news.firebaseio.com',
      });
  };

  function getItem(itemId) {
      return firebase.database().ref('v0')
          .child(`item/${itemId}`)
          .once('value')
          .then(snap => {
              let item = snap.val();
              if (!item) {
                  item = {deleted: true, id: item.id} // sometimes item will be returned null, e.g. id=20824713
              }
              if (item.kids) {
                  return Promise.all(item.kids.map(kid => getItem(kid)))
                      .then(res => {
                          item.comment = res;
                          return item;
                      })
              } else {
                  item.comment = [];
                  return item;
              }
          });
  };

  const item = await getItem(query.id);

  return { item };
}

export default getItem;