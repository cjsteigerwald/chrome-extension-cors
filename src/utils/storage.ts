import { resolveComponentProps } from '@mui/base';
export interface ChromeStorage {
  serverType?: ServerType[];
  sessionStorage?: SessionStorage[];
  cookies?: Cookies[];
  localStorage?: LocalStorage[];
}

export interface ServerType {
  name: string;
  url: string;
}

export interface SessionStorage {
  name: string;
  value: string;
}

export interface Cookies {
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

export const setStoredSessionStorage = (sessionStorage: SessionStorage[]): Promise<void> => {
  const vals: ChromeStorage = {
    sessionStorage,
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve;
    })
  })
}

export const getStoredSessionStorage = (): Promise<SessionStorage []> => {
  const keys: LocalStorageKeys[] = ['sessionStorage'];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: ChromeStorage) => {
      resolve(res.sessionStorage ?? []);
    })
  })
}

// helper function for returnSessionStorage()
const getSessionStorage = (): SessionStorage[] => {
  let aSessionStorage: SessionStorage[] = [];

  Object.keys(sessionStorage).forEach((key) => {
    console.log('', [key] + ':' + '', sessionStorage.getItem(key))
    aSessionStorage.push({name: String([key]), value: sessionStorage.getItem(key)})
  })
  return aSessionStorage;
}

export const returnSessionStorage = (): Promise<SessionStorage []> => {
  return new Promise<SessionStorage []>((resolve) => {

      let aSesssionStorage: SessionStorage[] = []
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
            aSesssionStorage = resp[0].result
            console.log('aSessionStorage: ', aSesssionStorage)
            resolve (resp[0].result)
          })
        } 
      })
  })
  
}

export const deleteServerTypes = () => {
  const keys: LocalStorageKeys[] = ['serverType'];
  chrome.storage.local.remove(keys, () => {
    console.log('Removed items for the key: ' + keys);
  });

}



