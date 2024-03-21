import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
    return (
        <div className='py-1' style={{ marginTop: '100px', marginBottom: '200px' }} >
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost