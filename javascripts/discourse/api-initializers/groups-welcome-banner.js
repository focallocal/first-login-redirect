import { apiInitializer } from "discourse/lib/api";
import GroupsWelcomeBanner from "../components/groups-welcome-banner";

export default apiInitializer("1.8.0", (api) => {
  // Render the banner at the top of the groups page
  api.renderInOutlet("before-groups-index", GroupsWelcomeBanner);
});
