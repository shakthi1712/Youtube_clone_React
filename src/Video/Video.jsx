import React from 'react'
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../data';
import { useState } from 'react';
import { useEffect } from 'react';
import { value_converter } from '../data';
import moment from 'moment';
export default function Video({ sidebar, category }) {
  const [data, setdata] = useState([]);
  const fetchdata = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
    await fetch(videoList_url)
      .then(response => response.json())
      .then(data => setdata(data.items))
  }
  useEffect(() => {
    fetchdata();
  }, [category])
  const navigate = useNavigate();
  return (
    <div className={`video-page ${sidebar ? "" : "small-video-page"}`}>
      {data.map((item, index) => {
        return (
          <div onClick={() => navigate(`/video/${item.snippet.categoryId}/${item.id}`)} className="video-container">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-description">
              <h4 className='video-title' >{item.snippet.title}</h4>
            </div>
            <p className='channel-name'>{item.snippet.channelTitle}</p>
            <div className="video-desc">
              <p className='video-views'>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
            </div>
          </div>
        )
      })}


    </div>
  )
}
