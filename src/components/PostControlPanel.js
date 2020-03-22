import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

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
        <ButtonGroup vertical className="control-panel">
            <Button onClick={handleNew}>New post</Button>
            <Button onClick={handleEdit}>Edit post</Button>
            <Button onClick={handleDelete}>Delete post</Button>
        </ButtonGroup>
    );
}

export default PostControlPanel;

