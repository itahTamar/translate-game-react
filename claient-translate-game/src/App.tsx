import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { useState } from 'react';
import { UserContext } from './context/userContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

let environment = "DEV"
environment === "DEV" ? process.env["SERVER_URL_DEV"] : process.env["SERVER_URL_PROD"]
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
