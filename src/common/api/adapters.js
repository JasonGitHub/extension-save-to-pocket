// API adapter for different backend implementations
// This allows the extension to work with various Pocket-like APIs

import { CONFIG } from '../config'

/**
 * API adapter interface for different backend implementations
 * Clone projects can implement this interface to match their API structure
 */
export class BaseAPIAdapter {
  constructor() {
    this.serviceName = CONFIG.SERVICE_NAME
    this.apiBase = CONFIG.URLS.API_BASE
  }

  // Authorization endpoint - override for different auth flows
  getAuthEndpoint() {
    return 'oauth/authorize/'
  }

  // Save item endpoint - override for different save APIs
  getSaveEndpoint() {
    return 'send/'
  }

  // Format save request - override for different request formats
  formatSaveRequest(saveObject) {
    return {
      actions: [
        {
          action: 'add',
          url: saveObject.url,
          title: saveObject.title,
          ...saveObject.actionInfo,
          ...saveObject.additionalParams
        }
      ]
    }
  }

  // Format save response - override for different response formats
  formatSaveResponse(response, saveObject) {
    return response
      ? { saveObject, status: 'ok', response: response.action_results[0] }
      : undefined
  }

  // Format auth request - override for different auth formats
  formatAuthRequest(guid, userCookies) {
    return {
      guid,
      token: userCookies.token,
      user_id: userCookies.userId,
      account: '1',
      grant_type: 'extension',
    }
  }

  // Format tag sync request - override for different tag APIs
  formatTagSyncRequest(itemId, tags) {
    return {
      actions: [
        {
          action: 'tags_replace',
          item_id: itemId,
          tags: tags.join(',')
        }
      ]
    }
  }

  // Format remove request - override for different remove APIs
  formatRemoveRequest(itemId) {
    return {
      actions: [
        {
          action: 'delete',
          item_id: itemId
        }
      ]
    }
  }
}

/**
 * Pocket-compatible API adapter (default)
 */
export class PocketAPIAdapter extends BaseAPIAdapter {
  // Uses default implementations from BaseAPIAdapter
}

/**
 * Example adapter for a hypothetical ReadLater service
 */
export class ReadLaterAPIAdapter extends BaseAPIAdapter {
  getSaveEndpoint() {
    return 'articles/save'
  }

  formatSaveRequest(saveObject) {
    // Different API structure for ReadLater
    return {
      url: saveObject.url,
      title: saveObject.title,
      tags: saveObject.tags || [],
      ...saveObject.additionalParams
    }
  }

  formatSaveResponse(response, saveObject) {
    // Different response structure
    return response?.success
      ? { saveObject, status: 'ok', response: { item_id: response.id } }
      : undefined
  }

  getAuthEndpoint() {
    return 'auth/extension'
  }

  formatAuthRequest(guid, userCookies) {
    // ReadLater uses different auth structure but we maintain compatibility
    return {
      extension_id: guid,
      session_token: userCookies.token,
      user_id: userCookies.userId,
      // Include base properties for API compatibility
      guid,
      token: userCookies.token,
      account: '1',
      grant_type: 'extension'
    }
  }
}

// Factory function to get the appropriate adapter
export function createAPIAdapter() {
  switch (CONFIG.SERVICE_NAME) {
    case 'ReadLater':
      return new ReadLaterAPIAdapter()
    case 'Pocket':
    default:
      return new PocketAPIAdapter()
  }
}

// Export the active adapter instance
export const apiAdapter = createAPIAdapter()