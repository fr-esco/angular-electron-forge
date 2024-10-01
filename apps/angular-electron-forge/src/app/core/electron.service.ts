import { Injectable } from "@angular/core"
import  { type ElectronAPI } from '@preload'

@Injectable({
  providedIn: "root",
})
export class ElectronService {
  api = window.electron;

  get isElectron(): boolean {
    return !!(window && window.electron)
  }
}

declare global {
  interface Window {
    electron: ElectronAPI
  }
}
