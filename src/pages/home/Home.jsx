import "../home/Home.css";
import ProfileSide from "../../components/profileSide/ProfileSide";

import HaikuModal from "../haikuModal/HaikuModal";
import EditProfile from "../editProfile/EditProfile";
import RightSide from "../../components/rightSide/RightSide";

import { Outlet } from "react-router-dom";

import Menu from "../../components/menu/Menu";
// import Pagination from '../../components/pagination/Pagination'
// import { useNavigate, useLocation } from 'react-router-dom';

const Home = ({
  openHaikuModal,
  setOpenHaikuModal,
  openProfileModal,
  setOpenProfileModal,
  openLikeModal,
  setOpenLikeModal,
  tags,
  setTags,
  currentId,
  setCurrentId,
  editFlag,
  setEditFlag,
  listOfFollowers,
  setListOfFollowers,
  listOfFollowing,
  setListOfFollowing,
  listOfCreatorFollowers,
  listOfCreatorFollowing,
  setListOfCreatorFollowers,
  setListOfCreatorFollowing,
}) => {
  return (
    <>
      <div>
        <div className="Home">
          <ProfileSide
            className=""
            openHaikuModal={openHaikuModal}
            setOpenHaikuModal={setOpenHaikuModal}
            openProfileModal={openProfileModal}
            setOpenProfileModal={setOpenProfileModal}
            openLikeModal={openLikeModal}
            setOpenLikeModal={setOpenLikeModal}
            tags={tags}
            setTags={setTags}
            listOfFollowers={listOfFollowers}
            setListOfFollowers={setListOfFollowers}
            listOfFollowing={listOfFollowing}
            setListOfFollowing={setListOfFollowing}
            listOfCreatorFollowers={listOfCreatorFollowers}
            setListOfCreatorFollowers={setListOfCreatorFollowers}
            listOfCreatorFollowing={listOfCreatorFollowing}
            setListOfCreatorFollowing={setListOfCreatorFollowing}
          />
          <Outlet />
          {/* <FollowList  
      followersList={followersList}
      followingList = {followingList}
     /> */}

          {/* {pathName == '/posts' && (<PostSide 
         currentId={currentId}
         setCurrentId={setCurrentId}
         openHaikuModal={openHaikuModal} 
         setOpenHaikuModal={setOpenHaikuModal}
         tags={tags}
         editFlag={editFlag} setEditFlag={setEditFlag}
        /> ) } */}

          {/* {pathName == (`/${userId}/follower` || `/${userId}/following`) && 
    (<FollowList  
      followersList={followersList}
      followingList = {followingList}
     />)    
  }  */}

          <RightSide />
        </div>
      </div>
      {openHaikuModal && (
        <HaikuModal
          openHaikuModal={openHaikuModal}
          setOpenHaikuModal={setOpenHaikuModal}
          currentId={currentId}
          setCurrentId={setCurrentId}
          editFlag={editFlag}
          setEditFlag={setEditFlag}
        />
      )}

      {openProfileModal && (
        <EditProfile
          openProfileModal={openProfileModal}
          setOpenProfileModal={setOpenProfileModal}
          // openDeleteAlertModal={openDeleteAlertModal}
          // setOpenDeleteAlertModal={setOpenDeleteAlertModal}
          // clickOutSide={clickOutSide}
          // checkTextExists={checkTextExists}
          // text={text}
          // setText={setText}
          // userName={userName}
          // setUserName={setUserName}
          // clickCloseModal={clickCloseModal}
          // bio={bio}
          // setBio={setBio}
        />
      )}
      <div className="md:hidden">
        <Menu />
      </div>
    </>
  );
};

export default Home;
