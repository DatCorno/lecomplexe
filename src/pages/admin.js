import React from 'react';
import Layout from "../components/Layout";
import PostControlPanel from "../components/PostControlPanel";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import fetch from 'isomorphic-unfetch'


class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = { post_id: -1 };
    }

    //TODO change fetch to point to API
    static async getInitialProps({ query: { id }}) {
        const res = await fetch(`http://localhost:3000/api/posts/author/${id}`)
        const json = await res.json()

        return { posts: json.data }
    }

    render() {
        const posts = this.props.posts;

        console.log(this.state);

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
                            {this.getPostsTitle(posts)}
                        </tbody>
                    </Table>
                </Col>
                <Col>
                    <PostControlPanel post_id={this.state.post_id}/>
                </Col>
            </Row>
            </Layout>
        )
    }

    changePostId(post_id) {
        console.log("Allo");
        this.setState({ post_id: post.id });
    }

    getPostsTitle(posts) {
        const posts_td = posts.map((post) => {
            return (
                    <tr key={post.id}
                        onClick={this.changePostId.bind(post.id)}
                    >
                        <td>{post.title}</td>
                    </tr>
            )
        });

        return posts_td;
    }
}

export default Admin
