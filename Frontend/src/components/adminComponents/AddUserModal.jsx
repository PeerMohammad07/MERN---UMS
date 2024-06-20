import React from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useAddNewUserMutation } from '../../slices/adminSlice.js/AdminApiSlics';
import { toast } from 'react-toastify';

const AddUserModal = ({ isOpen, close }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState(null);

  const [addNewUser,{isLoading}] = useAddNewUserMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(name.trim() == ''){
      toast.error('name is not defined')
      return
    }else if(email.trim() == ''){
      toast.error('email is not defined')
      return
    }

    if (confirmPassword !== confirmPassword) {
      toast.error('Passwords do not match')
  } else {
      try {
          const formData = new FormData()
          formData.append('name', name);
          formData.append('email', email);
          formData.append('password', confirmPassword);
          formData.append('image', image);
          await addNewUser(formData).unwrap()
          toast.success('Added new user')
          close()
      } catch (error) {
          toast.error(error?.data?.message || error.message);
      }

  }

  }

  const handleImageChange = (e) => {
    const files = e.target.files[0]
    setImage(files)
  }

  return (
    <Modal show={isOpen} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image</Form.Label>
            <div className="mb-3">
              <input type="file" onChange={handleImageChange} />
              {image && (
                <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px', marginTop: '1rem' }} />
              )}
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

  )
}

export default AddUserModal
