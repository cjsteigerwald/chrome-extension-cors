export interface ChromeStorage {
  serverType: ServerType[];
  headers?: Headers[];
  cookies?: Cookies[];
  localStorage?: LocalStorage[];
}

export interface ServerType {
  name: string;
  url: string;
}

export interface Headers {
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


