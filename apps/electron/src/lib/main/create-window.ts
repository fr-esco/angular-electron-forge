import { app, BrowserWindow } from 'electron'
import path from 'node:path'

let mainWindow: BrowserWindow | null

export const createWindow = (): void => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      devTools: !app.isPackaged,
      preload: path.join(__dirname, '..', 'preload.js'),
    },
  })

  const startURL = app.isPackaged
    ? `file://${path.join(__dirname, '..', '..', '..', 'angular-electron-forge', 'browser', 'index.html')}`
    : `http://localhost:4200`

  mainWindow.loadURL(startURL)

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}
