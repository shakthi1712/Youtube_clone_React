import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate();
    const { searchvalue } = useParams();
    const [searchVideo, setSearchvideo] = useState([]);
    const fetchsearch = async () => {
        const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCX5DIBRVhDlePf5XDXSwomamF5y-VjN-c&type=video&maxResults=20&q=${searchvalue}`;
        await fetch(searchUrl)
            .then(response => response.json())
            .then(data => setSearchvideo(data.items))
    }
    useEffect(() => {
        fetchsearch();
    }, [searchvalue])
    return (
        <div className='search--list'>
            {searchVideo.map((item, index) => {
                return (
                    <div key={index}>
                        <div onClick={() => navigate(`/Searchplayer/${item.id.videoId}`)} className="video-container">
                            <img src={item.snippet.thumbnails.medium.url} alt="" />
                            <div className="video-description">
                                <h4 className='video-title' >{item.snippet.title}</h4>
                            </div>
                            <p className='channel-name'>{item.snippet.channelTitle}</p>
                            <div className="video-desc">
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
