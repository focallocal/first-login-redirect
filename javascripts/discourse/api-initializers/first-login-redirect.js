import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const router = api.container.lookup("service:router");
  
  console.log("🚀 First-login-redirect: Initializing route interceptor");
  
  // Intercept route transitions
  router.on("routeWillChange", (transition) => {
    const user = api.getCurrentUser();
    
    if (!user) {
      return;
    }
    
    const targetRoute = transition.to?.name;
    console.log("🔍 Route transition detected:", targetRoute);
    
    // Intercept redirects to discovery routes (homepage variants)
    const isDiscoveryRoute = targetRoute?.startsWith("discovery.");
    
    if (isDiscoveryRoute) {
      // Check if user is a member of any groups (excluding automatic groups)
      // Automatic groups have IDs 0-15, user groups start at 20+
      const userGroups = user.groups || [];
      const hasJoinedGroups = userGroups.some(group => group.id >= 20);
      
      if (hasJoinedGroups) {
        console.log("✓ User is already in groups, allowing normal navigation");
        return;
      }
      
      // Check if we've already redirected this session
      const hasRedirectedThisSession = sessionStorage.getItem("redirected_to_groups");
      if (hasRedirectedThisSession) {
        console.log("✓ Already redirected to groups this session");
        return;
      }
      
      console.log("🔄 User not in any groups yet, redirecting to /g");
      
      // Mark as redirected this session
      sessionStorage.setItem("redirected_to_groups", "true");
      
      // Abort the current transition
      transition.abort();
      
      // Redirect to groups page
      router.transitionTo("groups.index");
    }
  });
  
  console.log("✅ First-login-redirect: Route interceptor installed");
});
