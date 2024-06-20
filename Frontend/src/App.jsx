import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import { Container } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
     <ToastContainer/>
     <Container style={{ '--bs-gutter-x': '0' }}>
     <Outlet/>
     </Container>
    </>
  )
}

export default App
