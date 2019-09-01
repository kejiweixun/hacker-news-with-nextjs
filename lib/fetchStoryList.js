import fetch from 'isomorphic-unfetch';

async function getStoryList({ pathname, query }) {
  const pageNum = query.p ? query.p : 1;
  const start = 30 * (pageNum - 1)
  const end = 30 * pageNum;

  const databaseURL = 'https://hacker-news.firebaseio.com/v0';

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
    storiesIds = await fetch(`${databaseURL}/${child}.json`)
      .then(res => res.json())
      .then(res =>
        res.submitted
          .slice(start, end)
      )
  } else {
    storiesIds = await fetch(`${databaseURL}/${child}.json`)
      .then(res => res.json())
      .then(res =>
        res.slice(start, end)
      )
  }

  const stories = await Promise.all(storiesIds.map(id => {
    return fetch(`${databaseURL}/item/${id}.json`)
      .then(res => res.json())
      .then(res => {
        if (res) {
          return res;
        } else {
          return { deleted: true, id: id }
        }
      })
  }))

  return { stories }
}

export default getStoryList;