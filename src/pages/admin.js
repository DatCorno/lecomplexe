import Layout from "../components/Layout";
import PostControlPanel from "../components/PostControlPanel";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import fetch from 'isomorphic-unfetch'

function getPostsTitle(posts) {
    const posts_td = posts.map((post) => {
        return (<tr>
                    <td>{post.title}</td>
                </tr>)
    });

    return posts_td;
}

function Admin({ posts }) {
    console.log(posts.length);
    return (
        <Layout>
        <Row>
            <Col xs={2}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <td>Title</td>
                        </tr>
                    </thead>
                    <tbody>
                        {getPostsTitle(posts)}
                    </tbody>
                </Table>
            </Col>
            <Col>
                <PostControlPanel />
            </Col>
        </Row>
        </Layout>
    )
}

//TODO change fetch to point to API
Admin.getInitialProps = async ({ query: { id }}) => {
    const res = await fetch(`http://localhost:3000/api/posts/author/${id}`)
    const json = await res.json()

    return { posts: json.data }
}

export default Admin
