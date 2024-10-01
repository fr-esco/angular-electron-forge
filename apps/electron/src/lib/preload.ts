// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'

console.log('⏪⏪', 'Preload')

const INVOKABLE_EVENTS = ['getVersions'] as const
const buildEventHandler = (event: string) => <T>(...args: unknown[]): Promise<T> => ipcRenderer.invoke(event, ...args)
const invokable = INVOKABLE_EVENTS.reduce((acc, event) => ({
  ...acc,
  [event]: buildEventHandler(event)
}), {} as Record<typeof INVOKABLE_EVENTS[number], ReturnType<typeof buildEventHandler>>)

const electronApi = {
  send: (channel: string, data: unknown) => {
    ipcRenderer.send(channel, data)
  },
  on: (channel: string, func: (...args: unknown[]) => void) => {
    const newFunc = (...args: unknown[]) => func(...args)
    ipcRenderer.on(channel, newFunc)
  },
  sendSync: (channel: string, data: unknown) => {
    return ipcRenderer.sendSync(channel, data)
  },
  removeListener: (channel: string, func: (...args: unknown[]) => void) => {
    ipcRenderer.removeListener(channel, func)
  },
  ...invokable,
  cmd: (command: string) => {
    return ipcRenderer.invoke('cmd:run-command', command)
  },
}

contextBridge.exposeInMainWorld('electron', electronApi)

export type ElectronAPI = typeof electronApi
