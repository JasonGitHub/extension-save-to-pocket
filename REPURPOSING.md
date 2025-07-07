# Repurposing Save to Pocket Extension for Clone Projects

This document explains how to repurpose the Save to Pocket browser extension for your own Pocket-like service or clone project.

## Overview

**Yes, it is practical to repurpose this extension for a Pocket clone project!** The extension has been refactored to support configurable backends with minimal changes required.

## Quick Start

### For a New Service

1. **Configure your service:**
   ```bash
   npm run configure [service-name] [consumer-key]
   ```

2. **Build the extension:**
   ```bash
   npm run build
   ```

### Pre-configured Services

**For Pocket (original):**
```bash
npm run build:pocket
```

**For ReadLater (example clone):**
```bash
npm run build:readlater
```

## Configuration System

The extension now uses a configurable system located in:
- `src/common/config.js` - Main configuration file
- `scripts/build-for-service.js` - Build script for different services

### Adding a New Service

Edit `scripts/build-for-service.js` and add your service to the `SERVICE_CONFIGS` object:

```javascript
const SERVICE_CONFIGS = {
  // ... existing configs
  yourservice: {
    SERVICE_NAME: 'YourService',
    BASE_DOMAIN: 'yourservice.com',
    API_VERSION: 'v1',
    BRANDING: {
      name: 'Save to YourService',
      shortName: 'YourService',
      description: 'Your service description.',
    }
  }
}
```

Then run:
```bash
node scripts/build-for-service.js yourservice YOUR_CONSUMER_KEY
```

## API Compatibility

The extension includes an API adapter system (`src/common/api/adapters.js`) that allows compatibility with different backend APIs.

### Supported API Patterns

**Pocket-compatible APIs:**
- Uses `/oauth/authorize/` for authentication
- Uses `/send/` endpoint with action-based requests
- Supports `add`, `delete`, `tags_replace` actions

**Custom APIs:**
- Extend `BaseAPIAdapter` class
- Override methods for different endpoint structures
- Implement in `createAPIAdapter()` factory function

### Example: Custom API Adapter

```javascript
export class CustomAPIAdapter extends BaseAPIAdapter {
  getSaveEndpoint() {
    return 'items/save'  // Different endpoint
  }

  formatSaveRequest(saveObject) {
    // Different request format
    return {
      url: saveObject.url,
      title: saveObject.title,
      user_id: this.getUserId()
    }
  }

  formatSaveResponse(response, saveObject) {
    // Different response format
    return response?.success
      ? { saveObject, status: 'ok', response: { item_id: response.id } }
      : undefined
  }
}
```

## Files Modified for Configuration

### Core Configuration
- ✅ `src/common/config.js` - New configuration system
- ✅ `src/common/constants.js` - Updated to use config
- ✅ `src/manifest.json` - Will be generated dynamically

### API Layer
- ✅ `src/common/api/adapters.js` - New API adapter system
- ✅ `src/common/api/saving/save.js` - Updated to use adapter
- ✅ `src/common/api/auth/authorize.js` - Updated to use adapter
- ✅ `src/common/api/saving/remove.js` - Updated to use adapter
- ✅ `src/common/api/saving/tags.js` - Updated to use adapter

### UI Components
- ✅ `src/pages/options/options.js` - Updated to use configurable URLs
- ✅ `src/common/helpers.js` - Updated login page detection

### Build System
- ✅ `scripts/build-for-service.js` - New build script
- ✅ `package.json` - Added new build commands

## Backend Requirements

To use this extension with your Pocket clone, your backend should support:

### Authentication
- OAuth-like flow or extension-specific auth endpoint
- Consumer key validation
- Access token generation

### Core API Endpoints
- **Save items**: Add URLs with title and metadata
- **Remove items**: Delete saved items
- **Tag management**: Add/remove tags from items
- **User authentication**: Validate extension access

### Response Formats
Either implement Pocket-compatible responses or create a custom API adapter.

## Customization Guide

### 1. Branding
Update the configuration object with your service details:
- Service name and descriptions
- Domain names
- API endpoints

### 2. Authentication Flow
- Update OAuth URLs in configuration
- Modify auth adapter if using different auth flow
- Update login success/failure page detection

### 3. UI Text and Localization
- Update `src/_locales/` files for different languages
- Modify UI text to match your service branding

### 4. Icons and Assets
Replace icons in `src/assets/images/`:
- `icon-16.png`, `icon-48.png`, `icon-128.png` - Extension icons
- `action-icon.png` - Toolbar button icon

### 5. API Compatibility
Create custom API adapter if your backend has different:
- Endpoint structures
- Request/response formats
- Authentication methods

## Testing Your Configuration

1. **Configure for your service:**
   ```bash
   node scripts/build-for-service.js yourservice YOUR_CONSUMER_KEY
   ```

2. **Build the extension:**
   ```bash
   npm run build
   ```

3. **Load in browser:**
   - Open Chrome/Edge extensions page
   - Enable Developer mode
   - Load unpacked extension from `dist/` folder

4. **Test functionality:**
   - Try saving a page
   - Test authentication flow
   - Verify API calls in Network tab

## Migration Checklist

- [ ] Configure service details in build script
- [ ] Set up authentication endpoints
- [ ] Implement or adapt API endpoints
- [ ] Test save/remove/tag functionality
- [ ] Update branding and UI text
- [ ] Replace icons and assets
- [ ] Test in target browsers
- [ ] Deploy and distribute

## Limitations and Considerations

### What's Easy to Change
- ✅ Service URLs and domains
- ✅ API endpoints and request formats
- ✅ Branding and UI text
- ✅ Authentication flow
- ✅ Basic API compatibility

### What Requires More Work
- 🔄 Complex authentication schemes (OAuth2, SAML, etc.)
- 🔄 Significantly different API structures
- 🔄 Advanced features (offline sync, real-time updates)
- 🔄 Mobile app integration

### Browser Extension Limitations
- Cannot bypass CORS policies
- Requires host permissions for your domain
- Subject to browser extension store policies

## Example: Complete ReadLater Setup

Here's how the extension can be configured for a hypothetical "ReadLater" service:

1. **Service runs on:** `example-readlater.com`
2. **API endpoint:** `https://example-readlater.com/v1/`
3. **Authentication:** Extension-specific auth at `/auth/extension`
4. **Save endpoint:** `/articles/save`

The configuration automatically generates:
- Proper manifest.json with correct permissions
- Updated API calls to the right endpoints
- Branded UI text and titles
- Proper authentication flow

## Support

This configuration system makes it practical to repurpose the extension for any Pocket-like service with minimal technical debt and maximum maintainability.

For questions about specific use cases or additional customization needs, refer to the source code comments and API adapter examples.