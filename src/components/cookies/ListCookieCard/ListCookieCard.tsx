import {	
	TextField,
	Paper,
	
} from '@mui/material';
import React from 'react';
import { Cookie } from '../../../utils/storage';
import './ListCookieCard.css';

const ListCookieCard: React.FC<{
	cookie: Cookie;
}> = ({ cookie }) => {

	const handleAddUrlButton = () => {
		console.log('This is listCookieCard: ', cookie);
		console.log(cookie);
	};

	return (
		<Paper elevation={10} style={{ marginBottom: '10px' }}>
			<TextField
				style={{ marginTop: '20px', marginBottom: '20px' }}
				fullWidth
				InputProps={{ readOnly: true }}
				label='key'
				variant='outlined'
				value={cookie.name}
			/>

			<TextField
				style={{ marginBottom: '20px' }}
				fullWidth
				multiline
				maxRows={10}
				variant='outlined'
				label='value'
				value={cookie.value}
			/>
		</Paper>
	);
};

export default ListCookieCard;

{
	/* <Typography className='inputBox-label'>Server Detail</Typography> */
}
