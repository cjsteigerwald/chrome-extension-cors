import {
	Box,
	Grid,
	IconButton,
	TextField,
	Paper,
	Typography,
	Card,
	CardContent,
	Tooltip,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CachedIcon from '@mui/icons-material/Cached';
import { Header } from '../../utils/storage';
import ListSessionStorageCard from '../ListSessionStorageCard/ListSessionStorageCard';
import useInput from '../../hooks/use-input';

const SessionStorageCardContainer: React.FC<{
	children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
	return (
		<Box sx={{ mx: '2px', my: '16px' }}>
			<Card>
				<CardContent>{children}</CardContent>
			</Card>
		</Box>
	);
};

const SessionStorageCard: React.FC<{
	headers: Header[];
	onAddHeader: (header: string) => void;
}> = ({ headers, onAddHeader }) => {
	// pass input to useInput hook to validate
	const {
		value: enteredHeaderName,
		isValid: enteredTargetServerUrlIsValid,
		hasError: enteredHeaderNameHasError,
		valueChangeHandler: headerNamChangeHandler,
		inputBlurHandler: headerNameBlurHandler,
		reset: resetHeaderNameInput,
	} = useInput((value) => value.trim() !== '');

	// const handleAddUrlButton = () => {
	// 	console.log('This is sessionStorage: ', sessionStorage);
	// 	console.log(enteredHeaderName);
	// };

	const buildListSessionStorageBox = (headers: Header[]) => {
		return (
			<Box pt={1}>
				<Typography
					align='center'
					variant='body1'
					style={{ marginBottom: '10px' }}>
					Headers
				</Typography>
				{headers.map((header: Header, index) =>
					buildListSessionStorageCard(header, index)
				)}
			</Box>
		);
	};

	const buildListSessionStorageCard = (header: Header, index: number) => {
		return <ListSessionStorageCard key={index} header={header} />;
	};

	const headerNameInputColor = enteredHeaderNameHasError ? 'error' : 'primary';

	const headerNameHandler = () => {
		onAddHeader(enteredHeaderName);
		resetHeaderNameInput();
		// console.log('This is sessionStorage: ', sessionStorage);
		// console.log(enteredHeaderName);
	};

	return (
		<SessionStorageCardContainer>
			<Grid container justifyContent='space-evenly'>
				<Grid item xs={11}>
					<TextField
						color={headerNameInputColor}
						required
						fullWidth
						placeholder={'Enter header name...'}
						onChange={headerNamChangeHandler}
						onBlur={headerNameBlurHandler}
						value={enteredHeaderName}
						variant='standard'
					/>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title='Add header' placement='top-start'>
						<span>
							<IconButton
								disabled={!enteredTargetServerUrlIsValid}
								color='success'
								onClick={headerNameHandler}>
								<AddIcon />
							</IconButton>
						</span>
					</Tooltip>
				</Grid>

				{headers.length > 0 ? buildListSessionStorageBox(headers) : null}
			</Grid>
		</SessionStorageCardContainer>
	);
};

export default SessionStorageCard;

{
	/* <Typography className='inputBox-label'>Server Detail</Typography> */
}
