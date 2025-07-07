// Manifest generator for different backend configurations
// This allows the manifest.json to be dynamically generated based on the active config

import { CONFIG, EXTENSION_CONSTANTS } from './config.js'

export function generateManifest() {
  return {
    "manifest_version": 3,
    "name": CONFIG.BRANDING.name,
    "default_locale": "en",
    "description": CONFIG.BRANDING.description,
    "icons": {
      "16": "assets/images/icon-16.png",
      "48": "assets/images/icon-48.png", 
      "128": "assets/images/icon-128.png"
    },
    "action": {
      "default_icon": {
        "38": "assets/images/action-icon.png"
      },
      "default_title": CONFIG.BRANDING.name
    },
    "background": {
      "service_worker": "pages/background/index.js"
    },
    "options_page": "pages/options/options.html",
    "content_scripts": [
      {
        "matches": [
          "*://*/*"
        ],
        "js": [
          "pages/injector/content.js"
        ],
        "css": [
          "assets/fonts/fonts.css",
          "assets/pocket-save-extension.css"
        ]
      },
      {
        "matches": [
          `*://${CONFIG.BASE_DOMAIN}${EXTENSION_CONSTANTS.LOGIN_SUCCESS_PATH}`
        ],
        "js": [
          "pages/login.js"
        ]
      },
      {
        "matches": [
          `*://${CONFIG.BASE_DOMAIN}${EXTENSION_CONSTANTS.LOGOUT_ERROR_PATH}`
        ],
        "js": [
          "pages/logout.js"
        ]
      }
    ],
    "host_permissions": [
      `*://${CONFIG.BASE_DOMAIN}/*`
    ],
    "permissions": [
      "tabs",
      "contextMenus",
      "cookies",
      "storage"
    ],
    "commands": {
      "save-to-pocket-action": {
        "suggested_key": {
          "default": "Ctrl+Shift+P",
          "windows": "Ctrl+Shift+P",
          "mac": "Command+Shift+P",
          "chromeos": "Ctrl+Shift+P",
          "linux": "Ctrl+Shift+P"
        },
        "description": `Save page to ${CONFIG.BRANDING.shortName}`
      }
    }
  }
}