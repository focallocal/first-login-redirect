import { apiInitializer } from "discourse/lib/api";
import GroupsWelcomeBanner from "../components/groups-welcome-banner";

export default apiInitializer("1.8.0", (api) => {
  console.log("📢 Groups Welcome Banner initializer loading");
  
  // Try multiple possible outlets for the groups page
  const outlets = [
    "above-main-container",
    "discovery-list-container-top",
    "before-list-area",
    "groups-header",
    "before-group-members"
  ];
  
  outlets.forEach(outlet => {
    console.log("🔌 Attempting to render banner in outlet:", outlet);
    api.renderInOutlet(outlet, GroupsWelcomeBanner);
  });
  
  console.log("✅ Banner registered for", outlets.length, "outlets");
});
