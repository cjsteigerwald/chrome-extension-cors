import { Box, Grid, IconButton, TextField, Paper, Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import { ServerType } from '../../utils/storage';

const ServerCardContainer: React.FC<{
  children: React.ReactNode
}> = ({children}) => {
  return (
    <Box sx={({ mx: '2px', my: '16px' })}>
      <Card>
        <CardContent>         
          {children}         
        </CardContent>
      </Card>
    </Box>
  )
}

const ServerCard: React.FC<{
  onUpdateUrl: (arg: ServerType) => void;
  serverType: ServerType;
}> = ({serverType, onUpdateUrl}) => {
  const [serverUrl, setServerUrl] = useState<string>('');

  useEffect(() => {
    setServerUrl(serverType.url)
    
  }, [])

  const handleAddUrlButton = () => {
    const updatedServer: ServerType = {
      ...serverType,
      url: serverUrl      
    }
    onUpdateUrl(updatedServer)
  }

  return (         
    <ServerCardContainer>
      <Grid container justifyContent='space-evenly'>
        <Grid item xs={9}>
          
            <TextField 
            required
            fullWidth
            value={serverUrl}
            placeholder={serverType.name + ' url'}
            onChange={(event) => setServerUrl(event.target.value)}
            variant='standard'/>
        </Grid>
        <Grid item xs={3}>
             <IconButton color='success' onClick={() => handleAddUrlButton()}>       
          <AddIcon />
          </IconButton>
          <IconButton color='primary'>
            <CachedIcon />
          </IconButton>
          
        </Grid>
      
      </Grid>


    </ServerCardContainer>
  )
}

export default ServerCard;

{/* <Typography className='inputBox-label'>Server Detail</Typography> */}