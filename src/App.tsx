import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './router/router'
import { useState } from 'react';
import { UserContext } from './context/userContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { ServerContext } from './context/serverUrlContext';

let environment = "DEV"
const serverUrl = environment === "DEV" ? import.meta.env.VITE_SERVER_URL_DEV : import.meta.env.VITE_SERVER_URL_PROD; //this is the way
disableReactDevTools()

function App() {

  const [user, setUser] = useState<any>(null);
  console.log(`Server URL: ${serverUrl}`); // Use serverUrl as needed
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ServerContext.Provider value={{serverUrl}}>
        <RouterProvider router={router} />
      </ServerContext.Provider>
    </UserContext.Provider>
  )
}

export default App