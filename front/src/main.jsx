import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

// screens
import AllPosts from './screen/AllPosts.jsx'
import Signin from './screen/Signin.jsx'
import Register from './screen/Register.jsx'
import NewPost from './screen/newPost.jsx'
import Post from './screen/Post.jsx'
import Profile from './screen/Profile.jsx'
import UpdateForm from './screen/UpdateForm.jsx'
import AdminPanel from './screen/AdminPanel.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/home' element={<AllPosts/>} />
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Register/>} />
      <Route path='/new' element={<NewPost/>}/>
      <Route path='/post/:id' element={<Post/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/post/update/:id' element={<UpdateForm/>}/>
      <Route path='/adminpanel' element={<AdminPanel/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
