import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import store from './store.js';
import {Provider} from 'react-redux'

//user side
import HomeScreen from './screens/userScreen/HomeScreen.jsx';
import LoginScreen from './screens/userScreen/LoginScreen.jsx';
import RegisterScreen from './screens/userScreen/RegisterScreen.jsx';
import ProfileScreen from './screens/userScreen/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

//Admin side
import AdminLogin from './screens/adminScreen/adminLogin.jsx';
import AdminPrivateRoute from './components/adminComponents/adminPrivateRoute.jsx';
import AdminHome from './screens/adminScreen/AdminHome.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<LoginScreen/>}/> 
      <Route path='/register' element={<RegisterScreen/>}/>
      <Route path='' element={<PrivateRoute/>}> 
      <Route index={true} path='/' element={<HomeScreen/>}/> 
        <Route path='/profile' element={<ProfileScreen/>}/> 
      </Route>
      <Route path='/admin' element={<AdminLogin/>}/>
      <Route path='' element={<AdminPrivateRoute/>}> 
          <Route path='/admin/home' element={<AdminHome/>}/>
      </Route>
    </Route>
  ) 
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>,
)
