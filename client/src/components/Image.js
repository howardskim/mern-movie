import React from 'react'

export default function Image(props) {
    return (
      <div className="image-container">
        <img
          src={
            `https://image.tmdb.org/t/p/w300/${props.info.poster_path}`
          }
        />
      </div>
    );
}
