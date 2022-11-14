import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Typography } from '@mui/material';
import ServerCard from '../components/ServerCard/ServerCard';
import { ServerType, getStoredServers, setStoredServers } from '../utils/storage';

import './popup.css'

const App: React.FC<{}> = () => {
const [serverType, setServerType] = useState<ServerType[]>([])
const [updateServerType, setUpdateServerType] = useState<ServerType>(null)
const [test, setTest] = useState<string>('')

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
          })
      } else {
        setServerType(storedServers);
      }
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
}

// const servers = ['target', 'dev'];

  return (
   <Box mx='8px' my='16px'>
    <Typography className='popup-title'>CORS Extension</Typography>   
    {
      serverType.map((server: ServerType, index) => <ServerCard 
          key={index} 
          serverType={server}
          onUpdateUrl={onUpdateUrl}/>)
    }
    
   </Box>
  )

} // APP




const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)

