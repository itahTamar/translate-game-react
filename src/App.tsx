import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { useState } from 'react';
import { UserContext } from './context/userContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { ServerContext } from './context/ServerUrlContext';

let environment = import.meta.env.MODE;
const dev_server = import.meta.env.VITE_REACT_APP_SERVER_URL_DEV
const prod_server = import.meta.env.VITE_REACT_APP_SERVER_URL_PROD
const checkEnvironment = environment === "DEV" ? dev_server : prod_server
disableReactDevTools()

function App() {
  const [serverUrl] = useState<string>(checkEnvironment)
  const [user, setUser] = useState<any>(null);
  console.log(`Server URL: ${serverUrl}`); // Use serverUrl as needed in the API path
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ServerContext.Provider value={serverUrl}>
        <RouterProvider router={router} />
      </ServerContext.Provider>
    </UserContext.Provider>
  )
}

export default App