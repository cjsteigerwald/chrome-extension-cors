import {
	Box,
	Grid,
	IconButton,
	TextField,
	Typography,
	Card,
	CardContent,
	Tooltip,
} from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Header } from '../../../utils/storage';
import ListHeaderCard from '../ListHeaderCard/ListHeaderCard';
import useInput from '../../../hooks/use-input';

const HeaderCardContainer: React.FC<{
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

const HeaderCard: React.FC<{
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

	const buildListHeaderBox = (headers: Header[]) => {
		return (
			<Box pt={1}>
				<Typography
					align='center'
					variant='body1'
					style={{ marginBottom: '10px' }}>
					Headers
				</Typography>
				{headers.map((header: Header, index) =>
					buildListHeaderCard(header, index)
				)}
			</Box>
		);
	};

	const buildListHeaderCard = (header: Header, index: number) => {
		console.log('Updated headers: ', headers);

		return <ListHeaderCard key={index} header={header} />;
	};

	const headerNameHandler = () => {
		onAddHeader(enteredHeaderName);
		resetHeaderNameInput();
	};

	const headerNameInputColor = enteredHeaderNameHasError ? 'error' : 'primary';

	return (
		<HeaderCardContainer>
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

				{headers.length > 0 ? buildListHeaderBox(headers) : null}
			</Grid>
		</HeaderCardContainer>
	);
};

export default HeaderCard;
