import ListGroup from 'react-bootstrap/ListGroup'

import Layout from '../components/Layout';
import PostPreview from "../components/PostPreview";
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

function getPosts(posts) {
    return posts.map((post) => {
        return (
            <ListGroup.Item>
                <PostPreview title={post.title} text={post.content} id={post.id}/>
            </ListGroup.Item>
        )
    });
}

function Index({ posts }) {

    return (
        <Layout>
            <ListGroup>
                {getPosts(posts)}
            </ListGroup>
        </Layout>
    )
}

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/posts')
    const json = await res.json()

    return { posts: json.data }
}

export default Index
