import React from 'react';
import {
	Box,
	Card,
	CardContent,
	Grid,
	IconButton,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useInput from '../../../hooks/use-input';
import { Cookie, Header } from '../../../utils/storage';
import GenericListCard from '../GenericList/GenericListCard';

const GenericCardContainer: React.FC<{
	children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
	return (
		<Box>
			<Card>
				<CardContent>{children}</CardContent>
			</Card>
		</Box>
	);
};

const GenericCard: React.FC<{
	genericValues: Cookie[] | Header[];
	onAddValue: (genericValue: string) => void;
	onGetAll: () => void;
	title: string;
	isError: boolean;
	errorMessage: string;
}> = ({
	genericValues,
	onAddValue,
	onGetAll,
	title,
	isError,
	errorMessage,
}) => {
	// use useInput hook to validate input
	const {
		value: enteredGenericValueName,
		isValid: enteredGenericValueIsValid,
		hasError: enteredGenericValueNameHasError,
		valueChangeHandler: genericValueNameChangeHandler,
		inputBlurHandler: genericValueNameBlurHandler,
		reset: resetGenericValueNameInput,
	} = useInput((value) => value.trim() !== '');

	const buildGenericListBox = (genericValues: Cookie[] | Header[]) => {
		return (
			<Box pt={1}>
				<Typography
					align='center'
					variant='body1'
					style={{ marginBottom: '10px' }}>
					{title}s
				</Typography>
				{genericValues.map((genericValue: Cookie | Header, index) =>
					buildListGenericCard(genericValue, index)
				)}
			</Box>
		);
	};

	const buildListGenericCard = (
		genericValue: Cookie | Header,
		index: number
	) => {
		return <GenericListCard key={index} genericValue={genericValue} />;
	};

	const genericValueNameHandler = () => {
		onAddValue(enteredGenericValueName);
		resetGenericValueNameInput();
	};

	const genericValueNameInputColor = enteredGenericValueNameHasError
		? 'error'
		: 'primary';

	return (
		<GenericCardContainer>
			<Grid container justifyContent='space-evenly'>
				<Grid item xs={11}>
					<TextField
						color={genericValueNameInputColor}
						required
						fullWidth
						placeholder={`Enter ${title.toLowerCase()} name...`}
						onChange={genericValueNameChangeHandler}
						onBlur={genericValueNameBlurHandler}
						value={enteredGenericValueName}
						variant='standard'
					/>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title={`Add ${title.toLowerCase()}`} placement='top-start'>
						<span>
							<IconButton
								disabled={!enteredGenericValueIsValid}
								color='success'
								onClick={genericValueNameHandler}>
								<AddIcon />
							</IconButton>
						</span>
					</Tooltip>
				</Grid>
				{isError && (
					<div>
						<p>{errorMessage}</p>
					</div>
				)}
				{genericValues.length > 0 ? buildGenericListBox(genericValues) : null}
			</Grid>
			<button onClick={onGetAll}>Get All {title}(s)</button>
		</GenericCardContainer>
	);
};

export default GenericCard;
