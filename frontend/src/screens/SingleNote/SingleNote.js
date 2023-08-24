import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotes, updateNotes } from '../../actions/notesActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';

function SingleNote({ match, history }) {

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");

    const dispatch = useDispatch();

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete } = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete')) {
            dispatch(deleteNotes(id));
        }
        history.push("/mynotes");
    }

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${match.params.id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        }
        fetching();

    }, [match.params.id, date]);

    const resetHandler = () => {
        setTitle("");
        setContent("");
        setCategory("");
    }

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNotes(match.params.id, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        history.push("/mynotes")
    }


    return (
        <MainScreen title="Edit Note">
            <Card>
                <Card.Header>Edit Your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the content"
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="content"
                                placeholder="Enter the Category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">
                            Update Note
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Note
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default SingleNote
