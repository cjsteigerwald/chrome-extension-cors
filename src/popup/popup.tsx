import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import ServerCard from '../components/ServerCard/ServerCard';
import SessionStorageCard from '../components/AddSessionStorageCard/AddSessionStorageCard';
import { ServerType, getStoredServers, setStoredServers, SessionStorage, getStoredSessionStorage, testTabs, Messages } from '../utils/storage';

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

const handleLoadButton = () => {
  console.log('Testing onUpdateUrl', onUpdateUrl)
  setIsLoaded(prevState => !prevState)
}

const handleClearButton = () => {
  console.log('Clear Button')
}

// const sessionStore: SessionStorage[] = [{ name: 'header_1', value: 'header_value_1'}, { name: 'header_2', value: 'header_value_2'}];
const sessionStore: SessionStorage[] = [
  {
      "name": "_c;;i",
      "value": "p:*|l:9007199254740991_31"
  },
  {
      "name": "sr;;1668539950468",
      "value": "p:m|l:29_{\"current\":{\"Wya\":{\"d\":645},\"RBb\":1668539950467},\"last\":{\"Wya\":{},\"RBb\":-1}}"
  },
  {
      "name": "hsb;;1668539950468",
      "value": "p:*|l:1_{\"state\":null,\"url\":\"/search?q=sessionStorage&oq=sessionStorage&aqs=chrome..69i57j0i20i263i512j0i512l3j69i60l3.10356j0j7&sourceid=chrome&ie=UTF-8\",\"metadata\":{\"nRa\":1668539950467,\"Il\":1668539950468,\"Zja\":1668539950469,\"LG\":0}}"
  },
  {
      "name": "hsb;;1668539950469",
      "value": "p:*|l:0_[1668539950468]"
  },
  {
      "name": "eob;;xplsd",
      "value": "p:m|l:30_{\"sessionStorage\":[{\"id\":\"eob11\",\"timestamp\":1668540193333}]}"
  }
];

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
    <SessionStorageCard sessionStorage={sessionStore} />
   </Box>
  )

} // APP




const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)

