import { Box, Grid, IconButton, TextField, Paper, Typography, Card, CardContent, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import { SessionStorage, ServerType } from '../../utils/storage';
import ListSessionStorageCard from '../ListSessionStorageCard/ListSessionStorageCard';

const SessionStorageCardContainer: React.FC<{
  children: React.ReactNode | React.ReactNode[]
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

const SessionStorageCard: React.FC<{
  sessionStorage: SessionStorage[]
}> = ({sessionStorage}) => {
  const [headerName, setHeaderName] = useState<string>('');


  const handleAddUrlButton = () => {
    console.log('This is sessionStorage: ', sessionStorage)
    console.log(headerName)
  }

const buildListSessionStorageBox = (sessionStorage: SessionStorage[]) => {
  return (
    <Box pt={1}>
      <Typography align='center' variant='body1' style={{ marginBottom: '10px'}}>SessionStorage</Typography>       
      {sessionStorage.map((header: SessionStorage, index) => buildListSessionStorageCard(header, index))} 
    </Box>
  )
}

const buildListSessionStorageCard = (sessionStorage: SessionStorage, index: number) => {
  return (
    <ListSessionStorageCard key={index} sessionStorage={sessionStorage} />
  )
}


  return (
    <SessionStorageCardContainer>
      <Grid container justifyContent='space-evenly'>
        <Grid item xs={11}>          
          <TextField 
            required
            fullWidth
            placeholder={'Enter header name...'}
            onChange={(event) => setHeaderName(event.target.value)}
            variant='standard'/>
        </Grid>
        <Grid item xs={1}>
          <Tooltip title='Add header' placement='top-start'>
              <IconButton color='success' onClick={() => handleAddUrlButton()}>       
                <AddIcon />
              </IconButton>                      
          </Tooltip>
        </Grid>
               
          {
            sessionStorage.length > 0 ? buildListSessionStorageBox(sessionStorage) : null
          } 
      
          
      </Grid>   
              
          
    </SessionStorageCardContainer>
        
  )
}

export default SessionStorageCard;

{/* <Typography className='inputBox-label'>Server Detail</Typography> */}