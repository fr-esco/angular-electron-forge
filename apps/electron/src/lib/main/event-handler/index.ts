import { handleGetVersions, EVENT_GET_VERSIONS } from './get-versions'

export const INVOKABLE_EVENTS = [
  EVENT_GET_VERSIONS
] as const

export const HANDLED_EVENTS = [
  ...INVOKABLE_EVENTS
] as const

export function setupEventHandlers() {
  handleGetVersions()
}
