import React from 'react';
import {Box, Card, CardContent, Grid, IconButton, TextField, Tooltip, Typography} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import useInput from '../../../hooks/use-input';
import { Cookie } from '../../../utils/storage';
import ListCookieCard from '../ListCookieCard/ListCookieCard';


const CookieCardContainer: React.FC<{
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

const CookieCard: React.FC<{
	cookies: Cookie[];
	onAddCookie: (cookie: string) => void;
}> = ({cookies, onAddCookie}) => {
	// use useInput hook to validate input
	const {
		value: enteredCookieName,
		isValid: enteredCookielIsValid,
		hasError: enteredCookieNameHasError,
		valueChangeHandler: cookieNamChangeHandler,
		inputBlurHandler: cookieNameBlurHandler,
		reset: resetCookieNameInput,
	} = useInput((value) => value.trim() !== '');

	const buildListCookieBox = (cookies: Cookie[]) => {
		return (
			<Box pt={1}>
				<Typography
					align='center'
					variant='body1'
					style={{ marginBottom: '10px' }}>
					Headers
				</Typography>
				{cookies.map((cookie: Cookie, index) =>
					buildListCookieCard(cookie, index)
				)}
			</Box>
		);
	};

	const buildListCookieCard = (cookie: Cookie, index: number) => {
		return <ListCookieCard key={index} cookie={cookie} />;
	};

	const cookieNameHandler = () => {
		onAddCookie(enteredCookieName);
		resetCookieNameInput();
	};

	const cookieNameInputColor = enteredCookieNameHasError
		? 'error'
		: 'primary';

 return (
	<CookieCardContainer> 
		<Grid container justifyContent='space-evenly'>
				<Grid item xs={11}>
					<TextField
						color={cookieNameInputColor}
						required
						fullWidth
						placeholder={'Enter cookie name...'}
						onChange={cookieNamChangeHandler}
						onBlur={cookieNameBlurHandler}
						value={enteredCookieName}
						variant='standard'
					/>
				</Grid>
				<Grid item xs={1}>
					<Tooltip title='Add cookie' placement='top-start'>
						<span>
							<IconButton
								disabled={!enteredCookielIsValid}
								color='success'
								onClick={cookieNameHandler}>
								<AddIcon />
							</IconButton>
						</span>
					</Tooltip>
				</Grid>

				{cookies.length > 0 ? buildListCookieBox(cookies) : null}
			</Grid>
	</CookieCardContainer>

 )
};

export default CookieCard;