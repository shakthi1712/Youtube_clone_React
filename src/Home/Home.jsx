import React, { useState } from 'react'
import '../App.css'
import Sidebar from '../Components/Sidebar'
import Video from '../Video/Video'

export default function Home({ sidebar }) {
  const [category, setcategory] = useState(0);
  return (
    <>
      <Sidebar sidebar={sidebar} category={category} setcategory={setcategory} />
      <Video sidebar={sidebar} category={category} setcategory={setcategory} />
    </>
  )
}

