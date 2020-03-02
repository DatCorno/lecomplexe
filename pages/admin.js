import ContainerLayout from "../components/ContainerLayout.js";
import PostPreview from "../components/PostPreview";
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'

function Admin({ posts }) {
    const _posts = posts.map((post) => {
        return (
        <li key={post.id}>
        <PostPreview title={post.title} text={post.content} id={post.id}/>
        </li>
        )
    })

    return (
        <ContainerLayout>
            <ul> {_posts} </ul>
        </ContainerLayout>
    )
}

Admin.getInitialProps = async ({ query: { id }}) => {
    const res = await fetch(`http://localhost:3000/api/posts/author/${id}`)
    const json = await res.json()

    return { posts: json.data }
}

export default Admin
