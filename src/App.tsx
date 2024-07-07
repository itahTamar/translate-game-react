import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { useState } from 'react';
import { UserContext } from './context/userContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

let environment = "DEV"
const dev_server = import.meta.env.VITE_REACT_APP_DEV_SERVER
const prod_server = import.meta.env.VITE_REACT_APP_SERVER_URL_PROD
environment === "DEV" ? dev_server : prod_server
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
