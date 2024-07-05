import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { useState } from 'react';
import { UserContext } from './context/userContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

let environment = "DEV"
environment === "DEV" ? "http://localhost:8000" : "https://book-list-server-2ab5.onrender.com"
disableReactDevTools()

function App() {

  const [user, setUser] = useState<any>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
    </UserContext.Provider>
  )
}

export default App
