import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileScreen.css'
import EditProfile from '../../components/EditProfile.jsx';  
import Header from '../../components/header'


const ProfileScreen = () => {

  const [editProfileModal,setEditProfileModal] = useState(false)

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  return (
    <>
    <Header/>
    <div className="profile-container">
    <div className="profile-image">
      <img src={userInfo.profileImage} alt="Profile" />
    </div>
    <h1 className='Heading-profile'>{userInfo.name}</h1>
    <div className="values">
      <input type="text" value={userInfo.name} readOnly/>
      <br />
      <input type="text" value={userInfo.email} readOnly/>
      <br />
      <button onClick={()=> setEditProfileModal(true)}>Edit</button>
    </div>
    {editProfileModal && <EditProfile editProf={EditProfile} setEditProf={setEditProfileModal} />}
  </div>
</>
    // <FormContianer>
    //   <h1>Update Profile</h1>
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group className='my-2' controlId='name'>
    //       <Form.Label>Name</Form.Label>
    //       <Form.Control
    //         type='name'
    //         placeholder='Enter name'
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='my-2' controlId='email'>
    //       <Form.Label>Email Address</Form.Label>
    //       <Form.Control
    //         type='email'
    //         placeholder='Enter email'
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //     <Form.Group className='my-2' controlId='password'>
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Enter password'
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Form.Group className='my-2' controlId='confirmPassword'>
    //       <Form.Label>Confirm Password</Form.Label>
    //       <Form.Control
    //         type='password'
    //         placeholder='Confirm password'
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>

    //        { isLoading && <Loader/> }

    //     <Button type='submit' variant='primary' className='mt-3'>
    //       Update
    //     </Button>
    //   </Form>

    
    // </FormContianer>
  );
};

export default ProfileScreen;
