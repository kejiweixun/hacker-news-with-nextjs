import React from 'react';

const TimeAgo = ({time}) => {
  const secondLapse = Date.now()/1000 - time;
  const minuteLapse = Math.floor(secondLapse/60).toFixed(0);
  const hourLapse = Math.floor(secondLapse/3600).toFixed(0);
  return (
    <>
    {minuteLapse < 60?
      minuteLapse < 2?
        `${minuteLapse} minute ago` :
        `${minuteLapse} minutes ago` :
      hourLapse < 2?
        `${hourLapse} hour ago` :
        `${hourLapse} hours ago` 

    }</>
  )
}

export default TimeAgo;