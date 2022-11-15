import { Box, Grid, IconButton, TextField, Paper, Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ServerType } from '../../utils/storage';

const ServerCard: React.FC<{
  onUpdateUrl: (arg: ServerType) => void;
  serverType: ServerType;
}> = ({serverType, onUpdateUrl}) => {
  const [serverUrl, setServerUrl] = useState<string>('');

  useEffect(() => {
    setServerUrl(serverType.url)
    
  }, [])

 onUpdateUrl({name: serverType.name, url: serverUrl});

  return (  
    <TextField 
    style={{ marginTop: '10px', marginBottom: '20px'}}
    required
    fullWidth
    value={serverUrl}
    placeholder={serverType.name + ' url'}
    onChange={(event) => setServerUrl(event.target.value)}
    variant='standard'/>   
  )
}

export default ServerCard;

{/* <Typography className='inputBox-label'>Server Detail</Typography> */}