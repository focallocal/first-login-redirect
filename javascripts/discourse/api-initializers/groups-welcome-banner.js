import { apiInitializer } from "discourse/lib/api";
import GroupsWelcomeBanner from "../components/groups-welcome-banner";

export default apiInitializer("1.8.0", (api) => {
  console.log("📢 Groups Welcome Banner: Rendering in above-main-container");
  api.renderInOutlet("above-main-container", GroupsWelcomeBanner);
});
