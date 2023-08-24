import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import ErrorMessage from '../../components/ErrorMessage';
import Loading from '../../components/Loading';
import MainScreen from '../../components/MainScreen';
import "./ProfileScreen.css";

function ProfileScreen({ history, location }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();


    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;


    useEffect(() => {
        if (!userInfo) {
            history.push("/")
        }
        else {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setPic(userInfo.pic);

        }
    }, [history, userInfo])

    const postDetails = (pics) => {
        setPicMessage(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append('file', pics)
            data.append('upload_preset', "notezipper")
            data.append('cloud_name', "dcmb0kcn5")

            fetch("https://api.cloudinary.com/v1_1/dcmb0kcn5/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setPic(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else {
            return setPicMessage("please select an image")
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(updateUser({ name, email, password, pic }))
        }
    }



    return (
        <MainScreen title="EDIT PROFILE">
            <div>
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler} >
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>
                            </Form.Group>{" "}
                            {picMessage && (
                                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                            )}
                            <Form.Group controlId="pic">
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.File
                                    onChange={(e) => postDetails(e.target.files[0])}
                                    id="custom-file"
                                    type="image/png"
                                    label="Upload Profile Picture"
                                    custom
                                />
                            </Form.Group>
                            <Button type="submit" varient="primary">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={pic} alt={name} className="profilePic" />
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
};


export default ProfileScreen
