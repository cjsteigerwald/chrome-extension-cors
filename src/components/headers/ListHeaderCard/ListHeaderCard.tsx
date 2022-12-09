import {
	Box,
	Grid,
	IconButton,
	TextField,
	TextareaAutosize,
	Paper,
	Tooltip,
	Typography,
	Card,
	CardContent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import { Header, ServerType } from '../../../utils/storage';
import './ListHeaderCard.css';

const ListHeaderCard: React.FC<{
	header: Header;
}> = ({ header }) => {
	// const [header, setHeader] = useState<string>('');

	const handleAddUrlButton = () => {
		console.log('This is sessionStorages: ', header);
		console.log(header);
	};

	return (
		<Paper elevation={10} style={{ marginBottom: '10px' }}>
			<TextField
				style={{ marginTop: '20px', marginBottom: '20px' }}
				fullWidth
				InputProps={{ readOnly: true }}
				label='key'
				variant='outlined'
				value={header.name}
			/>

			<TextField
				style={{ marginBottom: '20px' }}
				fullWidth
				multiline
				maxRows={10}
				variant='outlined'
				label='value'
				value={header.value}
			/>
		</Paper>
	);
};

export default ListHeaderCard;

{
	/* <Typography className='inputBox-label'>Server Detail</Typography> */
}
