import { Box, Grid, IconButton, TextField, TextareaAutosize, Paper, Tooltip, Typography, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import { SessionStorage, ServerType } from '../../utils/storage';
import './ListSessionStorageCard.css';

const ListSessionStorageCard: React.FC<{
  sessionStorage: SessionStorage
}> = ({sessionStorage}) => {
  const [sessionStorageName, setSessionStorageName] = useState<string>('');


  const handleAddUrlButton = () => {
    console.log('This is sessionStorages: ', sessionStorage)
    console.log(sessionStorageName)
  }

  return (
    
    <Paper elevation={10} style={{ marginBottom: '10px'}}>
     
        <TextField
         style={{ marginTop: '20px', marginBottom: '20px'}}
         fullWidth
         InputProps={{readOnly: true, }}
         label='key'
         variant='outlined'
         value={sessionStorage.name} />
      
   
       
       <TextField 
         style={{ marginBottom: '20px'}}
         fullWidth
         multiline
         maxRows={10}           
         variant='outlined'
         label='value'
         value={sessionStorage.value} />    
    </Paper>
    
          
     
    


  )
}

export default ListSessionStorageCard;

{/* <Typography className='inputBox-label'>Server Detail</Typography> */}