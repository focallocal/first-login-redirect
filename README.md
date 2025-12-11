# First Login Redirect

A Discourse theme component that redirects users without group memberships to a custom page and displays a customizable welcome banner.

## Features

- 🔄 **Smart Redirect** - Redirects users without group memberships to a custom page on login
- 🎨 **Customizable Banner** - Colorful welcome banner on groups page
- ⚙️ **Fully Configurable** - Enable/disable redirect and banner independently
- 👤 **Group-based logic** - Stops redirecting once user joins any group
- 🎯 **Trust Level aware** - Banner visibility can be restricted by trust level
- 🌈 **Rainbow Gradient** - Eye-catching 6-color gradient background (with toggle for solid color)
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
- Checks if user is a member of any groups
- Detects when they navigate to the homepage
- Redirects them to configured URL (default: `/g`)
- Stops redirecting once they join any group
- Can be disabled independently of banner

### Welcome Banner
- Shows on groups index page (`/g`) by default
- Visibility controlled by trust level settings
- Can be disabled independently of redirect
- Automatically hidden once user reaches Trust Level 1
- Positioned at top of groups list using `before-groups-index` outlet

## Customization

### Theme Settings (Admin Panel)

All customization can be done from the Discourse admin panel without editing code!

1. Go to **Admin → Customize → Themes**
2. Click on your theme that includes this component
3. Go to **Settings** and find the "First Login Redirect" section

**Available Settings:**

**Redirect Settings:**
- **Enable Redirect**: Turn redirect feature on/off (default: true)
- **Min Groups Required**: How many user-created groups they must join before redirect stops (default: 1)
  - Automatic groups (like trust_level_0, everyone) don't count
- **Redirect URL**: Where to send users without groups (default: `/g`)
  - Examples: `/g` (groups), `/categories`, `/about`, `/latest`

**Banner Settings:**
- **Show Banner**: Toggle the banner on/off (default: true)
- **Min Trust Level**: Minimum trust level to see banner (0-4, default: 0)
- **Max Trust Level**: Maximum trust level to see banner (0-4, default: 4)
- **Banner Heading**: Main large text
- **Banner Subheading**: Smaller explanatory text

**Typography:**
- **Heading Font Size**: Size of main heading (default: 2.5em)
- **Subheading Font Size**: Size of subheading (default: 1.25em)
- **Text Shadow Enabled**: Toggle text shadow for readability
- **Text Glow Enabled**: Toggle outer glow effect

**Colors:**
- **Use Gradient**: Enable/disable gradient (if disabled, uses solid color)
- **Gradient Color 1-6**: Customize each color in the gradient
  - Default: Pink → Orange → Yellow → Green → Cyan
  - Set "Use Gradient" to OFF for solid color using Color 1

**Layout:**
- **Banner Padding**: Space inside banner (default: 3rem 2rem)
- **Border Radius**: Corner roundness (default: 12px, use 0 for square)

### Examples

**Show for TL0 only (new users):**
Set Min Trust Level = 0, Max Trust Level = 0

**Show for everyone except admins:**
Set Min Trust Level = 0, Max Trust Level = 3

**Solid Color Banner:**
Turn OFF "Use Gradient" and set Color 1 to your desired color (e.g., `#FF5722` for orange).

**Two-Tone Gradient:**
Turn ON "Use Gradient" and set colors 1-3 to one color, colors 4-6 to another.

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

## Contributing

We welcome contributions! Before submitting a PR, please run the pre-push checks.

### Setup (First Time)

```bash
# Enable automated pre-push checks
git config core.hooksPath .githooks

# Install dependencies for linting (optional but recommended)
pnpm install
```

### Before Every PR

Run the quality check script:

```powershell
# Windows PowerShell
.\pre-push-check.ps1

# Auto-fix issues
.\pre-push-check.ps1 -Fix
```

The script checks for:
- ✅ CSS variables (no hardcoded colors)
- ✅ Modern `rgb()` syntax (not `rgba()`)
- ✅ Required `about.json` fields
- ✅ Linting (stylelint, prettier, eslint)

See `BEST_PRACTICES.md` for detailed Discourse theme development guidelines.

### Commit Guidelines

- Squash commits into a single commit before PR
- Use descriptive commit messages

## License

MIT — Public Happiness Movement
