import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.8.0", (api) => {
  api.onPageChange((url, title) => {
    const currentUser = api.getCurrentUser();
    if (!currentUser) return;

    // Check if user just completed signup (trust level 0 and first visit)
    // Discourse redirects new users to their profile after signup
    if (
      currentUser.trust_level === 0 &&
      (url === `/u/${currentUser.username}` || url === "/u/account-created")
    ) {
      // Check if we've already redirected (use sessionStorage to avoid loops)
      if (!sessionStorage.getItem("first_login_redirected")) {
        sessionStorage.setItem("first_login_redirected", "true");
        window.location.href = "/g";
      }
    }
  });
});
