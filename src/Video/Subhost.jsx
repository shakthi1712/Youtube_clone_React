import React, { useState } from 'react'
import { useEffect } from 'react';
import { value_converter } from '../data';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Subhost() {
    const [channel, setchannel] = useState([0]);
    const fetchdata = async () => {
        const urlfetch = "https://65fff8a0df565f1a6145920e.mockapi.io/data/id"
        await fetch(urlfetch)
            .then(response => response.json())
            .then(data => setchannel(data));
    }
    useEffect(() => {
        fetchdata();
    }, [])
    const deleteItem = async (val) => {
        fetch(`https://65fff8a0df565f1a6145920e.mockapi.io/data/id/${val}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete object');
                }
                setchannel(val.filter(obj => obj.id !== val));
            })
            .catch(error => {
                console.error('Error deleting object:', error);
            });

    }
    return (
        <div className='subscribe'>
            <h2 className='sub--head'>Subscribed Channels</h2>
            {channel.map((item, index) => {
                return (
                    <div key={index} className="sub--list">
                        <div className='sub--div'>
                            <img src={item ? item.snippet.thumbnails.default.url : "img"} alt="" />
                            <div className='sub--buttons'>
                                <p>{item ? item.snippet.title : "Title not available"}</p>
                                <span>{item ? value_converter(item.statistics.subscriberCount) : "12K"} subcribers</span>
                                <IconButton className='icon-delete' onClick={() => deleteItem(item.id)} aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
