import React, { useEffect, useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
import { useUpdateUserDetailsMutation } from '../../slices/adminSlice.js/AdminApiSlics';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { logout } from '../../slices/AuthSlice';

const EditUserModal = ({userData,isOpen,close}) => {

  const [updateProfile,{isLoading}] = useUpdateUserDetailsMutation()
  const dispatch = useDispatch()

  const [image,setImage] = useState(null)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')

  useEffect(()=>{
    setName(userData.name)
    setEmail(userData.email)
    setImage(userData.image)
  },[])


  const handleImageChange = (e) => {
    const files = e.target.files[0]
    setImage(files)
  }

  const handleSumbit = async (e) => {
    e.preventDefault();
  
    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isNameValid = /^[a-zA-Z _-]{3,16}$/.test(name);
    let errors = {};
  
    if (!isNameValid || name.trim() === '') {
      errors.name = 'Please Enter a valid name';
    }
    if (!isEmailValid || email.trim() === '') {
      errors.email = 'Please Enter a valid email';
    }
  
    if (Object.keys(errors).length > 0) {
      toast.error(errors.name);
      toast.error(errors.email);
      return;
    }
  
    try {
      console.log(userData,"userData",name,email,image);
      const formData = new FormData();
      formData.append('_id', userData._id);
      formData.append('name', name)
      formData.append('email', email);
      formData.append('image',image)

      const res = await updateProfile(formData).unwrap();

      toast.success('Profile updated');
      close();
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  }

  return (
    <>
    <Modal show={isOpen} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="mb-3 d-flex flex-column align-items-center">
        <Form.Label>Preview Image</Form.Label>
           <div className="d-flex justify-content-center">
             <img src={image ? URL.createObjectURL(image) : userData.profileImage }  alt="Preview" style={{ maxWidth: '100%', maxHeight: '150px', marginBottom: '1rem' }} />
          </div>
        <Form.Control type="file" onChange={handleImageChange} />
    </div>

        <Form onSubmit={handleSumbit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter name" />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={close}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSumbit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  </>
  )
}

export default EditUserModal
