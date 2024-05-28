import React from 'react'
import { useParams } from 'react-router-dom'

export default function Searchplayer() {
  const { links } = useParams();
  return (
    <div className='search-player'>
      <div className="search--player--container">
        <iframe src={`https://www.youtube.com/embed/${links}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      </div>
    </div>
  )
}
