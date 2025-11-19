import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  const router = api.container.lookup("service:router");
  
  console.log("🚀 First-login-redirect: Initializing route interceptor");
  
  // Intercept route transitions
  router.on("routeWillChange", (transition) => {
    const currentUser = api.getCurrentUser();
    
    if (!currentUser || currentUser.trust_level !== 0) {
      return; // Only process for TL0 users
    }
    
    // Check if we've already redirected this session
    const hasRedirected = sessionStorage.getItem("first_login_redirected");
    if (hasRedirected) {
      console.log("✓ Already redirected this session");
      return;
    }
    
    const targetRoute = transition.to?.name;
    console.log("🔍 Route transition detected:", targetRoute);
    
    // Intercept redirects to discovery routes (homepage variants)
    const isDiscoveryRoute = targetRoute?.startsWith("discovery.");
    
    if (isDiscoveryRoute) {
      console.log("🔄 Intercepting discovery route, redirecting TL0 user to /g");
      
      // Mark as redirected
      sessionStorage.setItem("first_login_redirected", "true");
      
      // Abort the current transition
      transition.abort();
      
      // Redirect to groups page
      router.transitionTo("groups.index");
    }
  });
  
  console.log("✅ First-login-redirect: Route interceptor installed");
});
