import Layout from "../components/Layout";
import PostControlPanel from "../components/PostControlPanel";
import fetch from 'isomorphic-unfetch'

function Admin({ posts }) {
    return (
        <Layout>
            <PostControlPanel />
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
