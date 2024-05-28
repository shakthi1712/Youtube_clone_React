import React from 'react'
import '../App.css'
import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import TvIcon from '@mui/icons-material/Tv';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import VideoCameraFrontTwoToneIcon from '@mui/icons-material/VideoCameraFrontTwoTone';
import { useNavigate } from 'react-router-dom';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';



export default function Sidebar({ sidebar, category, setcategory }) {
    const navigate = useNavigate();
    return (
        <div className={`side-bar ${sidebar ? "" : "small-side-bar"}`}>
            <div className="shortcut-links">
                <div className={`side-link ${category === 0 ? "active" : ""}`} onClick={() => setcategory(0)}>
                    <HomeIcon />
                    <p>Home</p>     
                </div>
                <div className={`side-link ${category === 20 ? "active" : ""}`} onClick={() => setcategory(20)}>
                    <SportsEsportsIcon />
                    <p>Gaming</p>
                </div>
                <div className={`side-link ${category === 17 ? "active" : ""}`} onClick={() => setcategory(17)}>
                    <SportsCricketIcon />
                    <p>Sports</p>
                </div>
                {/* <div className={`side-link ${category === 24 ? "active" : ""}`} onClick={() => setcategory(24)}>
                    <TvIcon />
                    <p>Entertainment</p>
                </div> */}
                <div className={`side-link ${category === 10 ? "active" : ""}`} onClick={() => setcategory(10)}>
                    <LibraryMusicIcon />
                    <p>Music</p>
                </div>
                <div className={`side-link ${category === 25 ? "active" : ""}`} onClick={() => setcategory(25)}>
                    <NewspaperIcon />
                    <p>News</p>
                </div>
                <div className={`side-link ${category === 24 ? "active" : ""}`} onClick={() => setcategory(24)}>
                    <VideoCameraFrontTwoToneIcon />
                    <p>Blogs</p>
                </div>
                <div className='side-link' onClick={() => navigate("/subscribe")}>
                    <SubscriptionsIcon />
                    <p>Subscription</p>
                </div>
            </div>
        </div>
    )
}
