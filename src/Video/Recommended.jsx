import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_KEY, value_converter } from '../data';

export default function Recommended({ categoryId }) {
    const [apidata, setapidata] = useState([]);
    const fetchdata = async () => {
        const relatedvideo = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`
        await fetch(relatedvideo).then(res => res.json()).then(data => setapidata(data.items))
    }
    useEffect(() => {
        fetchdata();
    }, [])
    const navigate = useNavigate();
    return (
        <div className='recommended'>
            {apidata.map((item, index) => {
                return (
                    <div onClick={() => navigate(`/video/${item.snippet.categoryId}/${item.id}`)} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)}views</p>
                        </div>
                    </div>

                )
            })}

        </div>
    )
}
