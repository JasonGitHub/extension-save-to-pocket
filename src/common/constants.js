// Import configuration system for easy repurposing
import { CONFIG, CONSUMER_KEY as CONSUMER_KEY_IMPORT, EXTENSION_CONSTANTS } from './config'

// URLs based on active configuration
export const AUTH_URL = CONFIG.URLS.AUTH
export const LOGOUT_URL = CONFIG.URLS.LOGOUT
export const API_URL = CONFIG.URLS.API_BASE
export const POCKET_LIST = CONFIG.URLS.USER_LIST
export const POCKET_HOME = CONFIG.URLS.USER_HOME

// Consumer key
export const CONSUMER_KEY = CONSUMER_KEY_IMPORT

// Extension constants
export const SET_SHORTCUTS = EXTENSION_CONSTANTS.SET_SHORTCUTS

// Legacy exports for backward compatibility
export const HELP_URL = CONFIG.URLS.HELP
export const CONTACT_URL = CONFIG.URLS.CONTACT
export const PRIVACY_URL = CONFIG.URLS.PRIVACY
export const TERMS_URL = CONFIG.URLS.TERMS
