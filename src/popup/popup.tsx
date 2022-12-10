import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
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
	getAllCookies,
	getHeader,
	setLocalHeaders,
	getCurrentTab,
	isCurrentTab,
	setStoredSessionStorage,
	setSessionStorage,
	setSessionCookies,
} from '../utils/storage';

import './popup.css';
import ServerForm from '../components/ServerCard/ServerForm';
import { updateDecorator } from 'typescript';
import GenericCard from '../components/generic/GenericCard/GenericCard';
import rules from '../static/rules1';
import { onChangeRequestHeaders } from '../utils/requestRules';

const App: React.FC<{}> = () => {
	const [servers, setServers] = useState<ServerType[]>([]);
	const [server, setServer] = useState<ServerType>(null);
	const [headers, setHeaders] = useState<Header[]>([]);
	const [cookies, setCookies] = useState<Cookie[]>([]);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isHeaderError, setIsHeaderError] = useState<boolean>(false);
	const [errorHeaderMessage, setHeaderErrorMessage] = useState<string>('');
	const [isCookieError, setIsCookieError] = useState<boolean>(false);
	const [errorCookieMessage, setCookieErrorMessage] = useState<string>('');
	const [requestHeaderEnable, setRequestHeaderEnable] = useState<boolean>(false);
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
	}, []);

	useEffect(() => {
		// util/requestRules.ts
		onChangeRequestHeaders(requestHeaderEnable);
	}, [requestHeaderEnable])

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
			console.log('Servers are: ', servers)
			setIsLoaded((prevState) => !prevState);
		});
		console.log('onClearServerUrl');
	};

	const addLocalHeaders = (): void => {
		setSessionStorage('java2blog.com', headers).then((resp) => {
			console.log('I am the response: ', resp);			
		});
	};

	const addLocalCookies = (): void => {
		setSessionCookies('https://java2blog.com', cookies)
	};

	const addAllHeaders = (): void => {
		const setAllHeaders = returnSessionStorage().then((headers: Header[]) => {
			setHeaders(headers);
		});
	};

	const addHeader = (headerName: string): void => {
		const updateHeaders: Header[] = [...headers];
		const aHeader = getHeader(headerName).then((header) => {
			if (header === undefined) {
				setIsHeaderError(true);
				setHeaderErrorMessage(`Header: ${headerName} not found!`);
				return;
			}
			setIsHeaderError(false);
			setHeaderErrorMessage('');
			updateHeaders.push(header);
			setHeaders(updateHeaders);
		});
	};

	const addCookie = (cookieName: string): void => {
		const updateCookies: Cookie[] = [...cookies];
		const aCookie = getCookie(cookieName).then((cookie: Cookie) => {
			if (cookie === undefined) {
				setIsCookieError(true);
				setCookieErrorMessage(`Cookie: ${cookieName} not found!`);
			}
			setIsCookieError(false);
			setCookieErrorMessage('');
			updateCookies.push(cookie);
			setCookies(updateCookies);
		});
	};

	const addAllCookies = () => {
		const targetUrl = 'https://www.google.com/';
		getAllCookies(targetUrl).then((cookies) => {
			console.log('Popup cookies: ', cookies)
			setCookies(cookies);
		});
		console.log('Popup: addAllCookies');
	};

	const clearServers = () => {
		onClearServers();
		console.log('clearServers');
	};

	return (
		<div className='app'>
			<button onClick={() => setRequestHeaderEnable((prevState) => !prevState)}>{!requestHeaderEnable ? 'Add Rule' : 'Remove Rule'}</button>
			<ServerForm
				onAddServers={updateServers}
				onClearServers={clearServers}
				servers={servers}
			/>
			{headers ? (
				<GenericCard
					genericValues={headers}
					onAddValue={addHeader}
					onGetAll={addAllHeaders}
					title='Header'
					isError={isHeaderError}
					errorMessage={errorHeaderMessage}
				/>
			) : null}
			{cookies ? (
				<GenericCard
					genericValues={cookies}
					onAddValue={addCookie}
					onGetAll={addAllCookies}
					title='Cookie'
					isError={isCookieError}
					errorMessage={errorCookieMessage}
				/>
			) : null}
		</div>
	);
}; // APP

const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<App />);
