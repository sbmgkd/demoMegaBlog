import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useDispatch } from 'react-redux';
import { allPost } from '../store/postSlice';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch();

      useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
                dispatch(allPost(posts.documents));
            }
        });
    }, [dispatch]);
    
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts