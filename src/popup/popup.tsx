import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import ServerCard from '../components/ServerCard/ServerCard';
import SessionStorageCard from '../components/AddSessionStorageCard/AddSessionStorageCard';
import { ServerType, getStoredServers, setStoredServers, SessionStorage, getStoredSessionStorage,  Messages, deleteServerTypes, returnSessionStorage } from '../utils/storage';

import './popup.css'

const App: React.FC<{}> = () => {
  const [serverType, setServerType] = useState<ServerType[]>([])
  const [sessionStorage, setSessionStorage] = useState<SessionStorage[]>([])
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  useEffect(() => {
    getStoredServers()
      .then(storedServers => {
        // initilize serverType if does not already exist in storage
        if (storedServers.length < 1) {
          const initialServerValues: ServerType[] = [
            {
              name: 'target',
              url: ''
            },
            {
              name: 'local dev',
              url: ''
            }
          ]
          setStoredServers(initialServerValues)
            .then(() => {
              setServerType(initialServerValues);
              setIsLoaded(prevState => !prevState)
            })
        } else {
          setServerType(storedServers);
          setIsLoaded(prevState => !prevState)
        }
      })

    getStoredSessionStorage()
      .then(storedSessionStorage => {
        setSessionStorage(storedSessionStorage);
      })

  }, [])

  const onUpdateUrl = (updatedServer: ServerType):void => {
    const tempServers = serverType.map((server: ServerType) => {
      if (server.name === updatedServer.name) {
        return {        
          ...updatedServer,
        };
      }
      return server;   
    })
    setStoredServers(tempServers)
    .then(() => {
      setServerType(tempServers);
    })
  } // onUpdateUrl

  let sessionStore: SessionStorage[] = []
  const handleLoadButton = () => {
    console.log('Testing onUpdateUrl', onUpdateUrl)
    setIsLoaded(prevState => !prevState)
    returnSessionStorage().then(resp => {
      setSessionStorage(resp);
    })
  }

  const handleClearButton = () => {
    const test = deleteServerTypes()    
    console.log('Clear Button')
  }

  return (
   <Box mx='8px' my='16px'>
    <Typography className='popup-title'>CORS Extension</Typography>
    <Card>
      <CardContent>
        {
          serverType.map((server: ServerType, index) => <ServerCard 
          key={index} 
          serverType={server}
          onUpdateUrl={onUpdateUrl}/>)
        }
        <Box textAlign="center">
       
          <Button 
            style={{ margin: '5px'}}
            variant="contained" 
            color={isLoaded === false ? 'success' : 'primary'}
            onClick={() => handleLoadButton()}>
            {isLoaded === false ? 'Load' : 'Update'}
          </Button>
          <Button 
            style={{ margin: '5px'}}
            variant="contained" 
            color='error'
            onClick={() => handleClearButton()}>
              Clear
          </Button>        
        </Box>
      </CardContent>      
    </Card>
    {
      sessionStorage ? <SessionStorageCard sessionStorage={sessionStorage} /> : null
    }    
   </Box>
  )
} // APP




const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)

