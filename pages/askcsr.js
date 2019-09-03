import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database';
import { useRouter } from 'next/router';

import Loading from '../components/Loading';
import StoryCsr from '../components/StoryCsr';


function AskCSR() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageQuery = useRouter().query.p;
  const pageNum = pageQuery ? Number(pageQuery) + 1 : 2;
  const start = 30 * (pageNum - 2);
  const end = 30 * (pageNum - 1);
  let mount = true;
  useEffect(() => {
    setLoading(true);
    if (!firebase.apps.length) {
      firebase.initializeApp({
        databaseURL: 'https://hacker-news.firebaseio.com'
      });
    };
    if (mount) {
      async function getItem() {
        const db = firebase.database().ref('v0');
        const askStories = await db.child('askstories')
          .once('value')
          .then(snap => {
            return Promise.all(snap.val().slice(start, end).map(id => {
              return db.child(`item/${id}`)
                .once('value')
                .then(snap => snap.val())
            }))
          });
        setLoading(false);
        setStories(askStories);

      };
      getItem();

    };

    return () => {
      mount = false;
    }
  }, [pageQuery])

  if (loading) {
    return <Loading />
  } else {
    return <StoryCsr
      stories={stories}
      pageNum={pageNum}
    />
  }
}

export default AskCSR;

