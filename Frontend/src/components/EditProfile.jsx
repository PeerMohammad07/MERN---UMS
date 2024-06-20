import React from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import FormContianer from '../components/FormContianer';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/AuthSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader.jsx';
import { useUpdateUserMutation } from '../slices/UserApiSlice.js';


const EditProfile = ({ editProf, setEditProf }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);


  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setName(userInfo.name)
    setEmail(userInfo.email)
  }, [userInfo.setName, userInfo.setEmail]);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file)
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isNameValid = /^[a-zA-Z _-]{3,16}$/.test(name);
    let errors = {};

    if (!isNameValid || name.trim() == '') {
      errors.name = 'Please Enter a valid name'
    }
    if (!isEmailValid || email.trim() == '') {
      errors.email = 'Please Enter a valid email';
    }

    if (Object.keys(errors).length > 0) {
      toast.error(errors.name);
      toast.error(errors.email);
      return;
    }
    
      try {
        const formData = new FormData();
        formData.append('_id', userInfo._id);
        formData.append('name', name)
        formData.append('email', email);
        formData.append('image',selectedImage)

        const res = await updateProfile(formData).unwrap()
        dispatch(setCredentials({ ...res }))
        toast.success('Profile updated');
        setEditProf(false)
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    
  };

  return (
    <>
      <Modal show={editProf} onHide={() => setEditProf(false)} >
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>

            <div className="text-center mb-6">
              <label htmlFor="image" className="block">
                {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Upload" className="w-24 h-24 rounded-full mt-3 mx-auto cursor-pointer hover:opacity-75 transition duration-300" />}
                <span className="text-blue-500 font-semibold mt-2 block"></span>
              </label>
              <input type="file" onChange={handleImageChange} accept="image/*" id="image" name="image" className='mt-1 mb-2 block w-full shadow-sm sm:text-sm focus:ring-teal-500 focus:border-teal-500 border-gray-300 rounded-md' />
            </div>


            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {isLoading && <Loader />}

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default EditProfile
