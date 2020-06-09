import React from 'react'
import noimage from '../images/noimage.jpg';

export default function Image(props) {
  const image = props.info.poster_path ? <img src={`https://image.tmdb.org/t/p/w300/${props.info.poster_path}`} /> : <img src={noimage} />
    return (
      <div className="image-container">
        {image}
      </div>
    );
}
