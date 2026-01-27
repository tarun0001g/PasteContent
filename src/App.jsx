import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Pastes from "./components/Pastes";
import View from "./components/View";

import './App.css'

function App() {

  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: 
        <div>
          <Navbar/>
          <Home/>
        </div>
      },
      {
        path: '/pastes',
        element: 
        <div>
          <Navbar/>
          <Pastes/>
        </div>
      },
      {
        path: '/pastes/:id',
        element: 
        <div>
          <Navbar/>
          <View/>
        </div>
      },
    
  ])

  return (
    <div>

      <RouterProvider router={router}/>

    </div>
  )
}

export default App
