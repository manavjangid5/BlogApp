import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => { 
        appwriteService.getAllPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                debugger
            }
        })
    }, [])
    
    return (
      <>
        <div className="w-full flex justify-center items-center" style={{ marginTop: '100px' }}>
            <div className="max-w-xl px-2 py-1">
                <h1 className="text-4xl font-bold text-center">All Posts by Community</h1>
            </div>
        </div>

        <div className="w-full py-2" style={{ marginBottom: '200px' }}>
          <Container>
            <div className="flex flex-wrap">
              {posts.map((post) => (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      </>
    );
}

export default AllPosts