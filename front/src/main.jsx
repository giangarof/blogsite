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
import {HelmetProvider} from 'react-helmet-async'

// screens
import Main from './screen/Main.jsx'

import Signin from './screen/Signin.jsx'
import Register from './screen/Register.jsx'

import Profile from './screen/Profile.jsx'
import UserUpdate from './screen/UserUpdate.jsx'

import NewPost from './screen/Posts/newPost.jsx'
import Projects from './screen/Posts/Projects.jsx'
import AllPosts from './components/AllPosts.jsx'
import Post from './screen/Posts/Post.jsx'
import UpdateForm from './screen/Posts/UpdateForm.jsx'
import AdminPanel from './screen/Posts/AdminPanel.jsx'


import Now from './screen/Notes/Now.jsx'
import NewNote from './screen/Notes/newNote.jsx'
import AdminPanelNotes from './screen/Notes/AdminPanelNotes.jsx'
import NoteById from './screen/Notes/NoteById.jsx'
import NoteByIdUpdate from './screen/Notes/NoteByIdUpdate.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path='/' element={<Main/>} />

      {/* Registration */}
      <Route path='/signin' element={<Signin/>} />
      <Route path='/signup' element={<Register/>} />


      {/* Posts */}
      <Route path='/projects' element={<Projects/>}/>
      <Route path='/search/:keyword' element={<Projects/>} />
      <Route path='/new' element={<NewPost/>}/>
      <Route path='/post/:id' element={<Post/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/post/update/:id' element={<UpdateForm/>}/>

      {/* Notes */}
      <Route path='/now' element={<Now/>}/>
      <Route path='/note/:id' element={<NoteById/>}/>
      <Route path='/note/update/:id' element={<NoteByIdUpdate/>}/>
      <Route path='/new-note' element={<NewNote/>}/>
      <Route path='/adminpanel-notes' element={<AdminPanelNotes/>}/>

      {/* User */}
      <Route path='/adminpanel' element={<AdminPanel/>}/>
      <Route path='/user/update' element={<UserUpdate/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
