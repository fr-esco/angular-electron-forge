import { ipcMain } from "electron"

export const EVENT_GET_VERSIONS = "getVersions"

export function handleGetVersions() {
  ipcMain.handle(
    EVENT_GET_VERSIONS,
    async function getVersions() {
      return process.versions
    }
  )
}
