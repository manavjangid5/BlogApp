import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth';

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currUser = await authService.getCurrentUser();
                debugger;
                const posts = await appwriteService.getPostsById(currUser.$id);
                if (posts) {
                    setPosts(posts.documents);

                    debugger;
                }
            } catch (error) {
                // Handle errors
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, []);
    
    return (
        <>
        <div className="w-full flex justify-center items-center" style={{ marginTop: '100px' }}>
            <div className="max-w-xl px-2 py-1">
                <h1 className="text-4xl font-bold text-center">Your Posts</h1>
            </div>
        </div>
        {posts.length ?
            
            <div className='w-full py-2' style={{ marginBottom: '200px' }}>
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
            :
            <h1 className="text-4xl font-bold text-center">No Posts Found</h1>
        }
        </>
    )
}

export default Home