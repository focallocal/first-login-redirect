# First Login Redirect to Groups

A Discourse theme component that redirects new users (Trust Level 0) to the groups page after their first login/signup and displays a welcome banner explaining what to do.

## Features

- 🔄 **Auto-redirect** - Redirects Trust Level 0 users to `/g` (groups page) after signup
- 📢 **Welcome banner** - Shows a friendly message at the top of the groups page
- 👤 **Trust Level aware** - Only affects new users (TL0), veterans see normal behavior
- 📱 **Mobile responsive** - Banner adapts to mobile screens

## Installation

1. In the Discourse Admin console, go to **Customize → Themes → Components** and click **Install**
2. Choose **From a Git repository** and paste:
   ```
   https://github.com/focallocal/first-login-redirect
   ```
3. Once installed, add the component to your active theme

## How It Works

### Redirect Logic
- Checks if user is Trust Level 0 (new user)
- Detects when they complete signup/login
- Redirects them once to `/g` (groups page)
- Uses sessionStorage to prevent redirect loops

### Welcome Banner
- Only shown on the groups index page (`/g`)
- Only visible to Trust Level 0 users
- Automatically hidden once user reaches Trust Level 1
- Positioned at top of groups list using `before-groups-index` outlet

## Customization

### Change Banner Message

Edit `javascripts/discourse/components/groups-welcome-banner.gjs`:

```javascript
<strong>Your Custom Title!</strong>
Your custom message here.
```

### Change Banner Colors

Edit `common/common.scss`:

```scss
.groups-welcome-banner {
  background: linear-gradient(135deg, #your-color-1, #your-color-2);
  border-left: 4px solid #your-border-color;
  color: #your-text-color;
}
```

### Disable Redirect (Banner Only)

Delete or comment out the file:
`javascripts/discourse/api-initializers/first-login-redirect.js`

### Change Trust Level Requirement

In both initializer files, change:
```javascript
currentUser.trust_level === 0
```
to:
```javascript
currentUser.trust_level <= 1  // TL0 and TL1
```

## Technical Details

- **API Version**: 1.8.0 (modern Discourse API)
- **Component Type**: Glimmer component with template tag
- **Plugin Outlet**: `before-groups-index`
- **Compatibility**: Discourse 2.8.0+

## Troubleshooting

**Q: Redirect not working**  
A: Clear your browser's sessionStorage and test with a fresh Trust Level 0 account

**Q: Banner not showing**  
A: Verify you're on `/g` route and logged in as TL0 user. Check browser console for errors.

**Q: Redirect loop**  
A: The sessionStorage check should prevent this. If it occurs, clear browser cache and sessionStorage.

## License

MIT — Public Happiness Movement
