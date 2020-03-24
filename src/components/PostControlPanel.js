import React, {Component} from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

class PostControlPanel extends Component {
    constructor(props) {
        super(props);

        this.handleNew = this.handleNew.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleNew(e) {
        console.log('New post');
    }

    handleEdit(e) {
        console.log('Edit post');
    }

    handleDelete(e) {
        console.log('Delete post');
    }

    render() {
        return (
            <ButtonGroup vertical className="control-panel">
                <Button onClick={this.handleNew}>New post</Button>
                <Button onClick={this.handleEdit} disabled={ this.props.post_id < 0 }>Edit post</Button>
                <Button onClick={this.handleDelete} disabled={ this.props.post_id < 0 }>Delete post</Button>
            </ButtonGroup>
        );
    }
}

export default PostControlPanel;

