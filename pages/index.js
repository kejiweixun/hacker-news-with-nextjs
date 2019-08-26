import React from 'react'
import Layout from '../components/Layout';
import Item from '../components/Item';
import fetch from 'isomorphic-unfetch';

const Index = (props) => {
  // const itemToElement = props.items.map((item) => {
  //   <Item item={item}/>
  // })
  console.log(props.items)
  return (
    <>
      <Layout title='Hacker News'>
        {/* {itemToElement} */}
        <Item />
      </Layout>
    </>
  )
}

Index.getInitialProps = async () => {
  const top30Url = 'https://hacker-news.firebaseio.com/v0/beststories.json?orderBy=%22$key%22&limitToFirst=30';
  const res = await fetch(top30Url);
  const top30Id = await res.json();
  const items = [];
  console.log(top30Id)
  for(let i = 0; i < 30; i++){
    const itemUrl = `https://hacker-news.firebaseio.com/v0/item/${top30Id[i]}.json`;
    const res = await fetch(itemUrl);
    const itemData = await res.json();
    console.log(itemData)
    items.push(itemData)
  };
  return {
    items: items
  }
}

export default Index;
