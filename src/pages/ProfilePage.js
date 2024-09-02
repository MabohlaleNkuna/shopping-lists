import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/userSlice';
import { Modal, Button, Form } from 'react-bootstrap';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name);
      setSurname(userData.surname);
      setEmail(userData.email);
      setPhoneNumber(userData.phoneNumber || '');
    }
  }, [userData]);

  const handleUpdate = () => {
    const updatedData = { ...userData, name, surname, email, phoneNumber, password }; // Include user ID
    dispatch(updateUser(updatedData));
    setShowModal(false);
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>
      {userData ? (
        <div className="profile-details">
          <p>Name: {userData.name}</p>
          <p>Surname: {userData.surname}</p>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phoneNumber || 'N/A'}</p>
          <Button variant="primary" onClick={() => setShowModal(true)}>Update Profile</Button>
        </div>
      ) : (
        <p>No user data available.</p>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={handleUpdate}>Update</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfilePage;
