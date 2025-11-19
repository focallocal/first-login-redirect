import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const router = api.container.lookup("service:router");
  
  console.log("🚀 First-login-redirect: Initializing route interceptor");
  
  // Clear redirect flag when user logs out
  api.onPageChange(() => {
    if (!api.getCurrentUser()) {
      sessionStorage.removeItem("redirected_to_groups");
      console.log("🔄 Cleared redirect flag (user logged out)");
    }
  });
  
  // Intercept route transitions
  router.on("routeWillChange", (transition) => {
    // Check if redirect is enabled
    if (!settings.enable_redirect) {
      return;
    }
    
    const user = api.getCurrentUser();
    
    if (!user) {
      return;
    }
    
    const targetRoute = transition.to?.name;
    console.log("🔍 Route transition detected:", targetRoute);
    
    // Intercept redirects to discovery routes (homepage variants)
    const isDiscoveryRoute = targetRoute?.startsWith("discovery.");
    
    if (isDiscoveryRoute) {
      // Get user's groups and filter out automatic groups
      const userGroups = user.groups || [];
      
      console.log("📋 All user groups:", userGroups);
      
      // Automatic groups in Discourse have these properties:
      // - automatic: true (this is the key property to check)
      const userCreatedGroups = userGroups.filter(group => !group.automatic);
      
      console.log(`📊 User has ${userCreatedGroups.length} non-automatic groups:`, userCreatedGroups);
      
      const minRequired = settings.min_groups_required || 1;
      const hasEnoughGroups = userCreatedGroups.length >= minRequired;
      
      if (hasEnoughGroups) {
        console.log(`✓ User has ${userCreatedGroups.length} groups (required: ${minRequired}), allowing normal navigation`);
        return;
      }
      
      // Check if we've already redirected this session
      const hasRedirectedThisSession = sessionStorage.getItem("redirected_to_groups");
      if (hasRedirectedThisSession) {
        console.log("✓ Already redirected this session");
        return;
      }
      
      const redirectUrl = settings.redirect_url || "/g";
      console.log(`🔄 User has only ${userCreatedGroups.length} groups (need ${minRequired}), redirecting to ${redirectUrl}`);
      
      // Mark as redirected this session
      sessionStorage.setItem("redirected_to_groups", "true");
      
      // Abort the current transition
      transition.abort();
      
      // Redirect to configured URL
      window.location.href = redirectUrl;
    }
  });
  
  console.log("✅ First-login-redirect: Route interceptor installed");
});
