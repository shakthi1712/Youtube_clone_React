import React, { useState } from 'react'
import '../App.css'
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import WidgetsIcon from '@mui/icons-material/Widgets';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ setsidebar, sidebar }) {
    const [inputValue, setInputValue] = useState('');
    const navigate=useNavigate();
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
    return (
        <div className='navbar'>
            <nav className="flex-div main--nav">
                <div className="nav-left flex-div">
                    <div className='menu-icon'>
                        <MenuIcon fontSize='large' onClick={() => setsidebar(sidebar === false ? true : false)} /></div>
                    <div className='flex-div youtube-icon' onClick={()=>{navigate('/')}} >
                        <YouTubeIcon sx={{ color: pink[500] }} fontSize='large' />
                        <p>SV</p>
                    </div>
                </div>
                <div className="nav-middle flex-div">
                    <div className="search-box flex-div">
                        <input
                            type="text"
                            placeholder='search...'
                            value={inputValue}
                            onChange={handleChange}
                        />
                        <IconButton fontSize='small' onClick={() => navigate(`/search/${inputValue}`)}><SearchIcon fontSize='small' /></IconButton>
                    </div>
                </div>
                <div className="nav-right flex-div">
                    <NotificationsActiveIcon fontSize='medium' className='notification' />
                    < AccountCircleIcon fontSize='large' />
                </div>
            </nav>
        </div>
    )
}
