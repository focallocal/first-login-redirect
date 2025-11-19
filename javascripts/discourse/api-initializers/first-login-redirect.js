import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.onPageChange((url, title) => {
    const currentUser = api.getCurrentUser();
    
    console.log("🔍 First-Login-Redirect: Page changed to:", url);
    console.log("👤 Current user:", currentUser?.username, "TL:", currentUser?.trust_level);
    
    if (!currentUser) {
      console.log("⚠️ No user logged in, skipping redirect");
      return;
    }

    // Only redirect Trust Level 0 users
    if (currentUser.trust_level !== 0) {
      console.log("✓ User is TL" + currentUser.trust_level + ", skipping redirect");
      return;
    }

    // Check if we've already redirected this session
    const hasRedirected = sessionStorage.getItem("first_login_redirected");
    if (hasRedirected) {
      console.log("✓ Already redirected this session, clearing flag to test");
      // For testing: Clear after first redirect so you can see it again
      // Comment this out in production
      sessionStorage.removeItem("first_login_redirected");
      return;
    }

    // Redirect on homepage variants (/, /top, /latest, /categories, etc.) but not /g
    const isHomepage = url === "/" || 
                       url.startsWith("/top") || 
                       url.startsWith("/latest") || 
                       url.startsWith("/categories");
    
    if (isHomepage) {
      console.log("🔄 Redirecting TL0 user from homepage to /g");
      sessionStorage.setItem("first_login_redirected", "true");
      window.location.href = "/g";
    } else if (url.startsWith("/g")) {
      console.log("✓ Already on groups page");
    } else {
      console.log("ℹ️ Not on homepage, not redirecting");
    }
  });
});
