import React, {useState,useEffect, useRef} from 'react'
import './PostSide.css'
import { useSelector, useDispatch } from 'react-redux'
import Pagination from '../../components/pagination/Pagination'

import { useNavigate, useLocation, useParams, } from 'react-router-dom';
import Posts from '../posts/Posts'
import ProfileCard from '../profileCard/ProfileCard';
import CreatorsProfileCard from '../creatorsProfileCard/CreatorsProfileCard';
import MoonLoader from "react-spinners/MoonLoader";
// import { getPosts, getUserPosts, getPostsBySearch, getPost } from '../../actions/postAction' 
import { getPost, getPosts, getUserPosts } from '../../features/posts/postsSlice';

import { AiFillTags } from 'react-icons/ai';
import LogoSearch from '../logoSearch/LogoSearch';
import { getCreatorProfile } from '../../features/creatorProfile/creatorProfileSlice';



const PostSide = ({
  currentId, 
  setCurrentId,   
  openHaikuModal,
  setOpenHaikuModal,  
  openLikeModal,
  setOpenLikeModal,
  postsPerPage, 
  editFlag, 
  setEditFlag, 
  listOfFollowers,
  setListOfFollowers,
  listOfFollowing,
  setListOfFollowing,
  listOfCreatorFollowers,
  setListOfCreatorFollowers,
  listOfCreatorFollowing,
  setListOfCreatorFollowing,
  tags,
  setTags
}) => {

  const  {posts, isLoading} = useSelector((state) => state.posts);


  // const [fetchPosts, setFetchPosts] = useState(posts);
//  console.log('state ' + JSON.stringify(useSelector((state) => state.postsReducer))  )

  const existingProfile = useSelector((state) => state.profile);
  const query = useQuery();
  const dispatch = useDispatch();
  const page = query.get('page') || 0;
  const searchQuery = query.get('searchQuery');
  const searchTags = query.get('tags')
  const [currentPage, setCurrentPage] = useState(1);
  const {creator} = useParams();
  const {postId} = useParams();
  const creatorsProfile = useSelector((state) => state.creatorProfile)
  const creatorId = creatorsProfile?.userId

 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}



useEffect(() => {
  // if(!creator){
    dispatch(getPosts(0))

  // }
  //   else if((searchTags || searchQuery )){
  //   dispatch(getPostsBySearch({ search: searchQuery, tags:  searchTags? searchTags : null}));

  // }

}, [dispatch])

//if icon image is changed, it update every icon image on posts 
useEffect(() => {
  if(creator){
    dispatch(getCreatorProfile(creator))
    dispatch(getUserPosts({creator: creatorId, page:0}))
   
  }else if(postId){
    dispatch(getPost(postId))
  }else{
    dispatch(getPosts(0))
  }
}, [existingProfile?.profileIconImg])
// useEffect(() => {
//   // if(effectRan.current === false){
//   if(creator){
//     dispatch(getUserPosts(creator, page));
//     dispatch(getCreatorProfile(creator));
//     console.log('creator dispatched ')
  
  
//   }
//   else if((searchTags || searchQuery )){
//     dispatch(getPostsBySearch({ search: searchQuery, tags:  searchTags? searchTags : null}));

//   }
//   else if(postId){
//     dispatch(getPost(postId));

//     console.log('postId is ' + postId )
//     console.log('dispatched getPost')
//   }
//   else{
//     dispatch(getPosts(page));
   
//   }
//   console.log('post length is ' + posts.length)
// // }

// // return () => effectRan.current = true;

// }, [creator, postId, page, searchTags, searchQuery, dispatch])
 
console.log('last posts ' + JSON.stringify(posts))
  return (
    <>
    <div className='w-full md:w-[70%] flex flex-col items-center min-h-screen'>
     <div className='lg:hidden flex w-full justify-center mt-5 mx-0
       pb-5
     '>
      <LogoSearch 
        tags={tags}
        setTags={setTags}
      />
     </div> 
       {creator && 
       <CreatorsProfileCard 
          listOfFollowers={listOfFollowers}
          setListOfFollowers={setListOfFollowers}
          listOfFollowing={listOfFollowing}
          setListOfFollowing={setListOfFollowing}
          listOfCreatorFollowers={listOfCreatorFollowers} 
          setListOfCreatorFollowers={setListOfCreatorFollowers}
          listOfCreatorFollowing={listOfCreatorFollowing} 
          setListOfCreatorFollowing={setListOfCreatorFollowing}
       />}
    {isLoading ? <div style={{ color:'pink', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}> <MoonLoader  color="rgba(255, 192, 203, 1)"/> </div> :
     posts?.length  ?
     <Posts 
        currentId={currentId} 
        setCurrentId={setCurrentId}
        openHaikuModal={openHaikuModal} 
        setOpenHaikuModal={setOpenHaikuModal}
        openLikeModal={openLikeModal}
        setOpenLikeModal={setOpenLikeModal}
        editFlag={editFlag} setEditFlag={setEditFlag}
        currentPage={currentPage} 
        postsPerPage={postsPerPage} 
        posts={posts}
  
     />
     :  <h1>No posts</h1>
   
    }  

    {/* display pagination only if there is no search words and tags */}
    { (!searchQuery && !tags.length) && (!postId) && <Pagination 
      //  postsPerPage={postsPerPage}
       setCurrentPage={setCurrentPage}
       page={page}
      />
    }
 
    </div> 
    
    </>
  )
}

export default PostSide