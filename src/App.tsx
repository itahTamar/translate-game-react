import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { useState } from 'react';
import { UserContext } from './context/userContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

let environment = "DEV"
//environment === "DEV" ? process.env["SERVER_URL_DEV"] : process.env["SERVER_URL_PROD"]   this isn't the way to use env in front-end
const serverUrl = environment === "DEV" ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL_PROD; //this is the way
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
