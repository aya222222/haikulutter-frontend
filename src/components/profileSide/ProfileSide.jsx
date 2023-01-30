import React from 'react'
import LogoSearch from '../logoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import PostBtnCard from '../postBtnCard/PostBtnCard'
import Menu from '../menu/Menu'
import './ProfileSide.css'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'


const ProfileSide = (
  {openHaikuModal, 
  setOpenHaikuModal, 
  setOpenProfileModal,
  openProfileModal, 
  tags, 
  setTags, 
  listOfFollowers, 
  setListOfFollowers,  
  listOfFollowing,
  setListOfFollowing,
  listOfCreatorFollowers,
  setListOfCreatorFollowers,
  listOfCreatorFollowing,
  setListOfCreatorFollowing,
 }) => {
  // const user = JSON.parse(localStorage?.getItem('profile'));
  // const [user, setUser] = useState(JSON.parse(localStorage?.getItem('profile')))
  const existingProfile = useSelector((state) => state.profile);

  // useEffect(() => {
  //   setUser(JSON.parse(localStorage?.getItem('profile')))
  // }, [user?.result?._id]);


  return (


    <div className='hidden md:w-[20%] md:flex md:flex-col gap-4'>
     
    <div className='lg:flex hidden'>
      <LogoSearch 
         tags={tags}
         setTags={setTags}
      />

    </div>
 
      {existingProfile.loggedIn ? (
        <>
          <ProfileCard className="hidden lg:flex"
            openProfileModal={openProfileModal}
            setOpenProfileModal={setOpenProfileModal}
            listOfFollowers={listOfFollowers}
            setListOfFollowers={setListOfFollowers}
            listOfFollowing={listOfFollowing}
            setListOfFollowing={setListOfFollowing}
            listOfCreatorFollowers={listOfCreatorFollowers} 
            setListOfCreatorFollowers={setListOfCreatorFollowers}
            listOfCreatorFollowing={listOfCreatorFollowing} 
            setListOfCreatorFollowing={setListOfCreatorFollowing}
      
          />

          <PostBtnCard 
            openHaikuModal={openHaikuModal} 
            setOpenHaikuModal={setOpenHaikuModal}
          />
          <div className='md:flex lg:hidden hidden'>
            <Menu />
          </div>
        </>
      ) :
       <>
        <div className='md:flex lg:hidden hidden'>
            <Menu />
        </div>
        <h6 className='text-center'>Please sign in to create your haiku.</h6>
       </>  
      }
     
    </div>

  )
}

export default ProfileSide