import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
	Box,
	Button,
	Card,
	CardContent,
	Stack,
	Typography,
} from '@mui/material';
import ServerCard from '../components/ServerCard/ServerCard';
import SessionStorageCard from '../components/AddSessionStorageCard/AddSessionStorageCard';
import {
	ServerType,
	getStoredServers,
	setStoredServers,
	getStoredSessionStorage,
	Messages,
	deleteServerTypes,
	returnSessionStorage,
	Cookie,
	Header,
	getCookie,
} from '../utils/storage';

import './popup.css';
import ServerForm from '../components/ServerCard/ServerForm';
import { updateDecorator } from 'typescript';
import CookieCard from '../components/cookies/AddCookieCard/AddCookieCard';

const App: React.FC<{}> = () => {
	const [servers, setServers] = useState<ServerType[]>([]);
	const [server, setServer] = useState<ServerType>(null);
	const [headers, setHeaders] = useState<Header[]>([]);
	const [cookies, setCookies] = useState<Cookie[]>([]);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	let theUpdatedServer: ServerType;

	useEffect(() => {
		getStoredServers().then((storedServers) => {
			// initilize servers if does not already exist in storage
			if (storedServers.length < 1) {
				const initialServerValues: ServerType[] = [
					{
						name: 'target',
						url: '',
					},
					{
						name: 'local',
						url: '',
					},
				];
				setStoredServers(initialServerValues).then(() => {
					setServers(initialServerValues);
					setIsLoaded(false);
				});
			} else {
				setServers(storedServers);
				setIsLoaded(true);
			}
		});

		// getStoredSessionStorage()
		//   .then(storedSessionStorage => {
		//     setHeaders(storedSessionStorage);
		//   })
	}, []);

	const onUpdateUrl = (updatedServer: ServerType): void => {
		theUpdatedServer = updatedServer;
	}; // onUpdateUrl

	const updateUrl = (): void => {
		const tempServers = servers.map((server: ServerType) => {
			if (server.name === theUpdatedServer.name) {
				return {
					...theUpdatedServer,
				};
			}
			return server;
		});
		setStoredServers(tempServers).then(() => {
			setServers(tempServers);
		});
	};

	const updateServers = (updateServers: ServerType[]) => {
		setStoredServers(updateServers).then(() => {
			setServers(updateServers);
			setIsLoaded(true);
			console.log('Stored Servers: ', servers);
		});
		// returnCookies().then(() => console.log('updateServers -> returnCookies'));
	};

	let sessionStore: Header[] = [];
	const handleLoadButton = () => {
		//  updateUrl();
		setIsLoaded(!isLoaded);

		// returnCookies()
		// setIsLoaded(prevState => !prevState)
		// returnSessionStorage().then(resp => {
		//   setHeaders(resp);
		// })
	};

	const onClearServers = () => {
		const initialServerValues: ServerType[] = [
			{
				name: 'target',
				url: '',
			},
			{
				name: 'local',
				url: '',
			},
		];
		setStoredServers(initialServerValues).then(() => {
			console.log('In arrow function');
			setServers(initialServerValues);
			setIsLoaded((prevState) => !prevState);
		});
		console.log('onClearServerUrl');
	};

	const addHeader = (headerName: string): void => {
		console.log('popup header: ', headerName);
		const test = getCookie(headerName).then((header: Header) => {
			console.log('this is header: ', header);
			setHeaders([header]);
		});
	};
	const addCookie = (cookieName: string): void => {
		console.log('popup cookie: ', cookieName);
		const test = getCookie(cookieName).then((cookie: Cookie) => {
			console.log('this is cookie: ', cookie);
			setCookies([cookie]);
		});
	};

	const clearServers = () => {
		onClearServers();
		console.log('clearServers');
	};

	return (
		<div className='app'>
			<ServerForm
				onAddServers={updateServers}
				onClearServers={clearServers}
				servers={servers}
			/>
			{headers ? (
				<SessionStorageCard headers={headers} onAddHeader={addHeader} />
			) : null}
			{cookies ? (
				<CookieCard cookies={cookies} onAddCookie={addCookie} />
			): null}
		</div>
	);
}; // APP

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
