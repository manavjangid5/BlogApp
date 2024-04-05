import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, PostCard } from '../components'
import authService from '../appwrite/auth';
import NoDataAnim from '../NDFAnim.json';
import Lottie from "lottie-react";
import homelogo from '../homelogo.json';
function Home() {
    const [posts, setPosts] = useState([])
    const [userActive, setUserActive] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const currUser = await authService.getCurrentUser();
                if (currUser) {
                    setUserActive(true);
                    const posts = await appwriteService.getPostsById(currUser.$id);
                    if (posts) {
                        setPosts(posts.documents);
                    }
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
            {userActive ? (
                <>
                    <div className="w-full flex justify-center items-center" style={{ marginTop: '100px' }}>
                        <div className="max-w-xl px-2 py-1">
                            <h1 className="text-4xl font-bold text-center">Your Posts</h1>
                        </div>
                    </div>
                    {posts.length ? (
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
                    ) : (
                        <div className='flex justify-center items-center'>
                            <Lottie loop={true} animationData={NoDataAnim} />
                        </div>
                    )}
                </>
            ) : (
                <>
                <div className="w-full flex justify-center items-center" style={{ marginTop: '100px' }}>
                    <div className="max-w-xl px-2 py-1">
                        <h1 className="text-4xl font-bold text-center">Welcome To the BLOG APP</h1>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <Lottie loop={true} animationData={homelogo} style={{ width: '500px', height: '500px' }} />
                </div>
                </>
            )}
        </>
    );
    
}

export default Home