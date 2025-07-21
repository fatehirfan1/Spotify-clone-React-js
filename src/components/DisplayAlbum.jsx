import React, { useContext } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { albumsData, assets, songsData } from '../assets/assets'
import PlayerContext from '../context/PlayerContext'

const DisplayAlbum = () => {
  const { id } = useParams()
  const albumData = albumsData[id]
  const {playWithId} = useContext(PlayerContext)

  return (
    <>
      <Navbar />

      {/* Album Header Section */}
      <div className='mt-10 flex gap-8 flex-col md:flex-row md:items-end'>
        <img className='w-48 rounded' src={albumData.image} alt="" />
        <div className='flex flex-col'>
          <p className='text-sm text-gray-300'>Playlist</p>
          <h2 className='text-5xl font-bold mb-4 md:text-7xl'>{albumData.name}</h2>
          <h4 className='text-base text-gray-400'>{albumData.desc}</h4>
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-300 flex-wrap">
            <img className="w-5 h-5" src={assets.spotify_logo} alt="Spotify logo" />
            <b className="text-white">Spotify</b>
            <span>• 1,323,154 likes</span>
            <span>• <b className="text-white">50 songs</b></span>
            <span>• About 2 hr 30 min</span>
          </div>
        </div>
      </div>

      {/* Songs Table Header */}
      <div className='grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]'>
        <p><b className='mr-4'>#</b>Title</p>
        <p>Album</p>
        <p className='hidden sm:block'>Date Added</p>
        <img className='m-auto w-4' src={assets.clock_icon} alt="clock icon" />
      </div>
      <hr className='border-[#ffffff22]' />

      {/* Songs List */}
      {
        songsData.map((item, index) => (
          <div onClick={()=>playWithId(item.id)}
            key={index}
            className='grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer'
          >
            {/* #, Image, and Title */}
            <div className='flex items-center gap-4'>
              <p className='text-white'>{index + 1}</p>
              <img className='w-10 rounded' src={item.image} alt={item.name} />
              <p className='text-white'>{item.name}</p>
            </div>
            <p className='text-[15px]'>{albumData.name}</p>
            <p className='text-[15px] hidden sm:block'>5 days ago</p>
            <p className='text-[15px] text-center'>{item.duration}</p>
          </div>
        ))
      }
    </>
  )
}

export default DisplayAlbum
