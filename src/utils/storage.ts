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

const getSessionStorage = () => {
  let aSessionStorage: SessionStorage[] = [];

  Object.keys(sessionStorage).forEach((key) => {
    console.log('', [key] + ':' + '', sessionStorage.getItem(key))
    aSessionStorage.push({name: String([key]), value: sessionStorage.getItem(key)})
    // aSessionStorage[key] = sessionStorage.getItem(key);
  })

  console.log('In get title', aSessionStorage)

  return aSessionStorage;
}

export const testTabs = () => {
  
  chrome.tabs.query({
    url: "*://www.google.com/*",
    currentWindow: true,
  }, (tabs) => {
    if (tabs.length > 0) {
      const id = tabs[0].id
      console.log('tab id: ', tabs[0]);
      // chrome.tabs.sendMessage(tabs[0].id, Messages.GET_SESSION_STORAGE, (response) => {
      //   console.log('Storage: In response ')
      // })
      chrome.scripting.executeScript({
        target: {tabId: id},
        func: getSessionStorage,
      },(resp) => {
        console.log('This is response: ', JSON.stringify(resp[0].result))
        console.log('This is tab: ', tabs[0])
        console.log('below script: ', sessionStorage.length)
      })
      // chrome.tabs.sendMessage(tabs[0].id, Messages.GET_SESSION_STORAGE)
    } else {
      console.log('tab not found')
    }
  })
  
}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log(message);
//   console.log(sender);
//   sendResponse('From the storage listener script');
// })





