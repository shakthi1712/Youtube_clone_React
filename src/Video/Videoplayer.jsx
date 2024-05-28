import React from 'react'
import { useParams } from 'react-router-dom'
import Playvideo from './Playvideo'
import Recommended from './Recommended'


export default function Videoplayer() {
  const { videoId, categoryId } = useParams();


  return (
    <div className="play-container">

      <Playvideo videoId={videoId} />
      <Recommended categoryId={categoryId} />

    </div>
  )
}
