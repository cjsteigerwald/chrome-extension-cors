import { TextField, Paper } from '@mui/material';
import React from 'react';
import { Cookie, Header } from '../../../utils/storage';
import './GenericListCard.css';

const GenericListCard: React.FC<{
	genericValue: Cookie | Header;
}> = ({ genericValue }) => {
	return (
		<Paper elevation={10} style={{ marginBottom: '10px' }}>
			<TextField
				style={{ marginTop: '20px', marginBottom: '20px' }}
				fullWidth
				InputProps={{ readOnly: true }}
				label='key'
				variant='outlined'
				value={genericValue.name}
			/>

			<TextField
				style={{ marginBottom: '20px' }}
				fullWidth
				multiline
				maxRows={10}
				variant='outlined'
				label='value'
				value={genericValue.value}
			/>
		</Paper>
	);
};

export default GenericListCard;
