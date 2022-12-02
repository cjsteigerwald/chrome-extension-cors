import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ServerType } from '../../utils/storage';

const ServerCard: React.FC<{
	server: ServerType;
	onSaveServerUrl: (updatedServer: ServerType) => void;
}> = ({ server, onSaveServerUrl }) => {
	const [serverUrl, setServerUrl] = useState<string>('');

	useEffect(() => {
		setServerUrl(server.url);
	}, []);

	useEffect(() => {
		console.log(serverUrl);
		onSaveServerUrl({ name: server.name, url: serverUrl });
	}, [serverUrl]);

	return (
		<TextField
			style={{ marginTop: '10px', marginBottom: '20px' }}
			required
			fullWidth
			value={serverUrl}
			placeholder={server.name + ' url'}
			onChange={(e) => setServerUrl(e.target.value)}
			variant='standard'
		/>
	);
};

export default ServerCard;

{
	/* <Typography className='inputBox-label'>Server Detail</Typography> */
}
