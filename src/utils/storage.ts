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
  value: string
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
  console.log('In setStoredServers: ', serverType)
  const vals: ChromeStorage = {
    serverType,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    })
  })
}

export const getStoredServers = (): Promise<ServerType []> => {
  const keys: LocalStorageKeys[] = ['serverType'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ChromeStorage) => {
      console.log('getStoredServers: ', res.serverType)
      resolve(res.serverType ?? []);
    })
  })
}

export const setStoredSessionStorage = (headers: Header[]): Promise<void> => {
  const vals: ChromeStorage = {
    headers,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve;
    })
  })
}

export const getStoredSessionStorage = (): Promise<Header[]> => {
  const keys: LocalStorageKeys[] = ['headers'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ChromeStorage) => {
      resolve(res.headers ?? []);
    })
  })
}

// helper function for returnSessionStorage()
const getSessionStorage = (): Header[] => {
  let aSessionStorage: Header[] = [];

  Object.keys(sessionStorage).forEach((key) => {
    console.log('', [key] + ':' + '', sessionStorage.getItem(key))
    aSessionStorage.push({name: String([key]), value: sessionStorage.getItem(key)})
  })
  return aSessionStorage;
}

export const returnSessionStorage = (): Promise<Header[]> => {
  return new Promise<Header[]>((resolve) => {

      let headers: Header[] = []
      chrome.tabs.query({
        url: "*://www.google.com/*",
        currentWindow: true,
      }, (tabs) => {
        if (tabs.length > 0) {
          const id = tabs[0].id
          console.log('tab id: ', tabs[0]);
          chrome.scripting.executeScript({
            target: {tabId: id},
            func: getSessionStorage,
          },(resp) => {
            console.log('This is response: ', JSON.stringify(resp[0].result))
            // console.log('This is tab: ', tabs[0])
            // console.log('below script: ', sessionStorage.length)
            headers = resp[0].result
            console.log('aSessionStorage: ', headers)
            resolve (resp[0].result)
          })
        } 
      })
  })  
}

export const deleteServerTypes = () => {
  const clearUrls: ServerType[] = [
    {
      name: 'target',
      url: ''
    },
    {
      name: 'local',
      url: ''
    }
  ]
}

export const getHeader = async (headerName: string): Promise<Header> => {
  const cookies = await chrome.cookies.getAll( { url: "https://www.google.com" })

  const aCookie = cookies.reduce<Cookie>((accumulator,cookie)  => {
    if (cookie.name === headerName){
     return {name: cookie.name, value: cookie.value}
    }
    return accumulator;
   }, {} as Cookie)
  return aCookie;
}



