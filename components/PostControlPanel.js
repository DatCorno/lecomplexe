function PostControlPanel() {
    function handleNew(e) {
        e.preventDefault();
        console.log('New post');
    }

    function handleEdit(e) {
        e.preventDefault();
        console.log('Edit post');
    }

    function handleDelete(e) {
        e.preventDefault();
        console.log('Delete post');
    }

    return (
        <div className="control-panel">
            <button onClick={handleNew}>New post</button>
            <button onClick={handleEdit}>Edit post</button>
            <button onClick={handleDelete}>Delete post</button>
        </div>
    );
}

export default PostControlPanel;

