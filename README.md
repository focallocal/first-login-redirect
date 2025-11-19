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

### Theme Settings (Admin Panel)

All customization can be done from the Discourse admin panel without editing code!

1. Go to **Admin → Customize → Themes**
2. Click on your theme that includes this component
3. Go to **Settings** and find the "First Login Redirect" section

**Available Settings:**

**Content:**
- **Show Banner**: Toggle the banner on/off
- **Banner Heading**: Main large text
- **Banner Subheading**: Smaller explanatory text

**Typography:**
- **Heading Font Size**: Size of main heading (default: 2.5em)
- **Subheading Font Size**: Size of subheading (default: 1.25em)
- **Text Shadow Enabled**: Toggle text shadow for readability
- **Text Glow Enabled**: Toggle outer glow effect

**Colors (8-color gradient):**
- **Gradient Color 1-8**: Customize each color in the rainbow gradient
  - Default is rainbow: Purple → Magenta → Orange → Yellow → Green → Cyan → Indigo
  - Set all 8 to the same color for a solid background

**Layout:**
- **Banner Padding**: Space inside banner (default: 3rem 2rem)
- **Border Radius**: Corner roundness (default: 12px, use 0 for square)

### Examples

**Solid Color Banner:**
Set all gradient colors 1-8 to `#3F51B5` for solid blue.

**Two-Tone Gradient:**
Set colors 1-4 to `#6B4E9D` (purple) and colors 5-8 to `#00BCD4` (cyan).

**Larger Text:**
Set heading to `3em` and subheading to `1.5em`.

**No Effects:**
Disable both "Text Shadow" and "Text Glow" for flat text.

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
