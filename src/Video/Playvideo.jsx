import React, { useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Button from '@mui/material/Button';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { API_KEY, value_converter } from '../data';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
export default function Playvideo() {
    let theme = createTheme({
      });
      theme = createTheme(theme, {
        palette: {
          salmon: theme.palette.augmentColor({
            color: {
              main: '#FF5733',
            },
            name: 'salmon',
          }),
        },
      });
    const [likeicon,setlikeicon]=useState(false);
    const [sub,setsub]=useState("contained");
    const {videoId}=useParams();
    const [apiData, setapiData] = useState(null);
    const [channeldata, setchanneldata] = useState(null);
    const [commentdata,setcommentdata]=useState([]);
    
    const fetchvideodata = async () => {
        const videodetailsurl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videodetailsurl)
            .then(response => response.json())
            .then(data => setapiData(data.items[0]))
    }
    const fetchotherdata = async () => {
        const channeldataurl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData ? apiData.snippet.channelId : "3uvfq4Cu8R8"}&key=${API_KEY}`;
        await fetch(channeldataurl)
            .then(res => res.json())
            .then(data => setchanneldata(data.items[0]))
         const commenturl=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${API_KEY}`
         await fetch(commenturl).then(res=>res.json()).then(data=>setcommentdata(data.items))
    }
    useEffect(() => {
        fetchvideodata();
    }, [videoId])
    useEffect(() => {
        if(apiData){
        fetchotherdata();
        }
    }, [apiData])
    const sendDataToApi = async (channeldata) => {
        try {
            const response = await fetch('https://65fff8a0df565f1a6145920e.mockapi.io/data/id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(channeldata)
            });
    
            if (!response.ok) {
                throw new Error('Failed to send data to the API');
            }
    
            const responseData = await response.json();
            console.log('API response:', responseData);
        } catch (error) {
            console.error('Error sending data to the API:', error.message);
        }
    };
    const subChannel=() =>{
        sub==="outlined"?setsub("contained"):setsub("outlined");
        sendDataToApi(channeldata);
        alert("Subscribed")
    }
    return (
        <div className='play-video'>
            <div>
                <iframe src={`https://www.youtube.com/embed/${videoId}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share "allowfullscreen ></iframe>
                <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
                <div className="play-video-info">
                    <div>
                        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16k"} views &bull; {moment(apiData ? apiData.snippet.publishedAt : "").fromNow()}</p>
                    </div>
                    <div className='like-share-button'>
                    
                    <Button  onClick={()=>likeicon===false?setlikeicon(true):setlikeicon(false)} color="inherit">{likeicon===true?<ThumbUpIcon/>:<ThumbUpOutlinedIcon/>}{apiData ? value_converter(apiData.statistics.likeCount) : "12K"}</Button>
                         <Button color="inherit"><ShareIcon />Share</Button>
                         <Button color="inherit"><SaveAltIcon />Save</Button>
                    </div>
                </div>
                
                <hr />
                <div className="publisher">
                    <img src={channeldata?channeldata.snippet.thumbnails.default.url:"img"} alt="" />
                    <div className=' publisher-div'>
                        <p>{apiData ? apiData.snippet.channelTitle : "Title not available"}</p>
                        <span>{channeldata?value_converter(channeldata.statistics.subscriberCount):"12K"} subcribers</span>
                    </div>
                    <ThemeProvider theme={theme}>
                    <Button onClick={subChannel} variant={sub} color="salmon">
                        Subscribe
                    </Button>
                    </ThemeProvider>

                </div>
                <div className="vid-description">
                    <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description not available"}</p>
                    <hr />
                    <h4>{apiData ? value_converter(apiData.statistics.commentCount) : "100"} comments</h4>
                    {commentdata.map((item,index)=>{
                            return(
                                <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}<span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <ThumbUpIcon fontSize='small' />
                                <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                            </div>
                        </div>

                    </div>
                                
                            )
                        })}
                    
                   
                </div>
            </div>
        </div>
    )
}
