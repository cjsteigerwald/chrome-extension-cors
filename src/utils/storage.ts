import { resolveComponentProps } from '@mui/base';
export interface ChromeStorage {
	serverType?: ServerType[];
	headers?: Header[];
	cookies?: Cookie[];
	localStorage?: LocalStorage[];
}

export interface ServerType {
	name: string;
	url: string;
}

export interface Header {
	name: string;
	value: string;
}

export interface Cookie {
	name: string;
	value: string;
}

export interface LocalStorage {
	name: string;
	value: string;
}

export type LocalStorageKeys = keyof ChromeStorage;

export enum Messages {
	GET_SESSION_STORAGE,
}

export const setStoredServers = (serverType: ServerType[]): Promise<void> => {
	console.log('In setStoredServers: ', serverType);
	const vals: ChromeStorage = {
		serverType,
	};
	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve();
		});
	});
};

export const getHeader = (headerName: string): Promise<Header> => {
	const header = returnSessionStorage().then((headers: Header[]) => {
		return headers.find((header: Header) => {
			return header.name === headerName;
		});
	});
	return header;
};

export const setLocalHeaders = (localHeaders: Header[]): void => {
	console.log('These are the headers: ', localHeaders);
	const set = setLocalStorage(localHeaders).then((resp) => {
		console.log('setLocalHeaders resp: ', resp);
	});
};

const testLocal = (): void => {
	console.log('These are testLocal headers: ');
};

// export const getTargetTab = (targetUrl: string): Promise<any> => {
// 	let theUrl: string = '';
// 	return new Promise<string>((resovle) => {
// 		chrome.tabs.query({ url: targetUrl });
// 	});
// };

// returns if current tab in focus is target tab url
export const isCurrentTab = (targetUrl: string): Promise<boolean> => {
	return new Promise<boolean>((resolve) => {
		const tab = getCurrentTab().then((currentTabUrl) => {
			resolve(targetUrl === currentTabUrl);
		});
	});
};

// returns the current tab in focus
export const getCurrentTab = (): Promise<any> => {
	let theUrl: string = '';
	return new Promise<string>((resolve) => {
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			let url = tabs[0].url;
			console.log('This is my url', url);
			const re = /(?<=\/\/)(.*?)(?=\/)/;
			console.log(url.match(re)[0]);
			theUrl = url.match(re)[0];
			resolve(theUrl);
		});
	});
};

const setLocalStorage = (localHeaders: Header[]): Promise<boolean> => {
	console.log('In setLocalStorage');
	return new Promise<boolean>((resolve) => {
		chrome.tabs.query(
			{
				url: '*://*.java2blog.com/*',
				currentWindow: false,
			},
			(tabs) => {
				if (tabs.length > 0) {
					const id = tabs[0].id;
					console.log('tab id: ', tabs[0]);
					chrome.scripting.executeScript(
						{
							target: { tabId: id },
							func: testLocal,
						},
						(resp) => {
							console.log('Below: ', resp);
							// console.log('This is response: ', JSON.stringify(resp[0].result));
							console.log('This is tab: ', tabs[0]);
							// console.log('below script: ', sessionStorage.length)
							// headers = resp[0].result;
							// console.log('aSessionStorage: ', headers);
							resolve(true);
						}
					);
				}
			}
		);
	});
};

export const getStoredServers = (): Promise<ServerType[]> => {
	const keys: LocalStorageKeys[] = ['serverType'];
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: ChromeStorage) => {
			console.log('getStoredServers: ', res.serverType);
			resolve(res.serverType ?? []);
		});
	});
};

export const setStoredSessionStorage = (headers: Header[]): Promise<void> => {
	const vals: ChromeStorage = {
		headers,
	};
	return new Promise((resolve) => {
		chrome.storage.local.set(vals, () => {
			resolve;
		});
	});
};

export const getStoredSessionStorage = (): Promise<Header[]> => {
	const keys: LocalStorageKeys[] = ['headers'];
	return new Promise((resolve) => {
		chrome.storage.local.get(keys, (res: ChromeStorage) => {
			resolve(res.headers ?? []);
		});
	});
};

// helper function for returnSessionStorage()
const getSessionStorage = (): Header[] => {
	let aSessionStorage: Header[] = [];

	Object.keys(sessionStorage).forEach((key) => {
		console.log('', [key] + ':' + '', sessionStorage.getItem(key));
		aSessionStorage.push({
			name: String([key]),
			value: sessionStorage.getItem(key),
		});
	});
	return aSessionStorage;
};

export const returnSessionStorage = (): Promise<Header[]> => {
	return new Promise<Header[]>((resolve) => {
		let headers: Header[] = [];
		chrome.tabs.query(
			{
				url: '*://www.google.com/*',
				currentWindow: true,
			},
			(tabs) => {
				if (tabs.length > 0) {
					const id = tabs[0].id;
					console.log('tab id: ', tabs[0]);
					chrome.scripting.executeScript(
						{
							target: { tabId: id },
							func: getSessionStorage,
						},
						(resp) => {
							// console.log('This is response: ', JSON.stringify(resp[0].result));
							// console.log('This is tab: ', tabs[0])
							// console.log('below script: ', sessionStorage.length)
							headers = resp[0].result;
							// console.log('aSessionStorage: ', headers);
							resolve(resp[0].result);
						}
					);
				}
			}
		);
	});
};

export const deleteServerTypes = () => {
	const clearUrls: ServerType[] = [
		{
			name: 'target',
			url: '',
		},
		{
			name: 'local',
			url: '',
		},
	];
};

export const getAllCookies = async (targetUrl: string): Promise<Cookie[]> => {
	let cookieRes: Cookie[] = [];
	const cookies = await (
		await chrome.cookies.getAll({ url: targetUrl })
	).map((resp) => {
		cookieRes.push({ name: resp.name, value: resp.value });
	});
	return cookieRes;
};

export const getCookie = async (cookieName: string): Promise<Cookie> => {
	const cookies = await chrome.cookies.getAll({ url: 'https://google.com/' });

	const aCookie = cookies.reduce<Cookie>((accumulator, cookie) => {
		if (cookie.name === cookieName) {
			return { name: cookie.name, value: cookie.value };
		}
		return accumulator;
	}, {} as Cookie);
	return aCookie;
};
