import { Button } from '@mui/material';
import React from 'react';
import useInput from '../../hooks/use-input';
import { ServerType } from '../../utils/storage';

const ServerForm = ({ onAddServers, onClearServers, servers }) => {
	console.log('ServerForm Servers: ', servers);
	// pass input to useInput hook to validate
	const {
		value: enteredTargetServerUrl,
		isValid: enteredTargetServerUrlIsValid,
		hasError: enteredTargetServerUrlHasError,
		valueChangeHandler: targetServerUrlChangeHandler,
		inputBlurHandler: targetServerUrlBlurHandler,
		reset: resetTargetServerUrlInput,
	} = useInput((value) => value.trim() !== '' && value.includes('.'));

	const {
		value: enteredLocalServerUrl,
		isValid: enteredLocalServerUrlIsValid,
		hasError: enteredLocalServerUrlHasError,
		valueChangeHandler: localServerUrlChangeHandler,
		inputBlurHandler: localServerUrlBlurHandler,
		reset: resetLocalServerUrlInput,
	} = useInput((value) => value.trim() !== '' && value.includes('.'));

	let formIsValid = false;
	if (enteredTargetServerUrlIsValid && enteredLocalServerUrlIsValid) {
		formIsValid = true;
	}

	const formClearHandler = () => {
		console.log('servers: ', servers[0].url);
		onClearServers();
		resetTargetServerUrlInput();
		resetLocalServerUrlInput();
	};

	const formSubmissionHandler = (event) => {
		event.preventDefault();
		if (!formIsValid) {
			return;
		}
		let servers: ServerType[] = [
			{
				name: 'target',
				url: enteredTargetServerUrl,
			},
			{
				name: 'local',
				url: enteredLocalServerUrl,
			},
		];
		onAddServers(servers);
	};

	const targetServerPlaceholder =
		servers[0]?.url !== '' ? servers[0]?.url : 'Enter target url...';

	const localServerPlaceholder =
		servers[1]?.url !== '' ? servers[1]?.url : 'Enter local url...';

	// if input is invalid set invalid class to notify user
	const targetServerUrlInputClasses = enteredTargetServerUrlHasError
		? 'form-control invalid'
		: 'form-control';

	const localServerUrlInputClasses = enteredLocalServerUrlHasError
		? 'form-control invalid'
		: 'form-control';

	return (
		<form onSubmit={formSubmissionHandler}>
			<div className='control-group'>
				<div className={targetServerUrlInputClasses}>
					<label htmlFor='targetServerUrl'>Target Server Url</label>
					<input
						type='text'
						id='targetServerUrlInput'
						onChange={targetServerUrlChangeHandler}
						onBlur={targetServerUrlBlurHandler}
						value={enteredTargetServerUrl}
						placeholder={targetServerPlaceholder}
						// placeholder={servers[0]?.url}
					/>
				</div>
				<div className={localServerUrlInputClasses}>
					<label htmlFor='localServerUrl'>Local Server Url</label>
					<input
						type='text'
						id='localServerUrlInput'
						onChange={localServerUrlChangeHandler}
						onBlur={localServerUrlBlurHandler}
						value={enteredLocalServerUrl}
						placeholder={localServerPlaceholder}
					/>
				</div>
			</div>
			<div className='form-actions'>
				<Button
					type='submit'
					disabled={!formIsValid}
					variant='contained'
					color='success'
					onClick={formSubmissionHandler}>
					Submit
				</Button>
				<Button variant='contained' color='error' onClick={formClearHandler}>
					Clear
				</Button>
			</div>
		</form>
	);
};

export default ServerForm;
