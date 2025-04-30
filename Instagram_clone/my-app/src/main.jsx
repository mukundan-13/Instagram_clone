
import {createRoot } from 'react-dom/client'
import ViewStory from "./Viewstory.jsx";
import Feed from './Feed.jsx';
import Profile from './Profile.jsx'
import Posts from './Posts.jsx';
import Messages from './Messages.jsx';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'

const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>
    },
    {
      path:'/story/:id/:tot',
      element:<ViewStory/>
    },
    {
      path:'/profile',
      element:<Profile/>
    },
    {
      path:'/messages',
      element:<Messages/>
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
 
)
