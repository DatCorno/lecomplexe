import Link from 'next/link'

const PostPreview = (props) => (
    <div>
        <h1>{props.title}</h1>
        <p>{props.text}</p>
        <Link href={`/posts?title=${props.title}`}>
            <a>Read More</a>
        </Link>
    </div>
);

export default PostPreview
