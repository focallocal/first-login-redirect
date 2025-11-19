import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class GroupsWelcomeBanner extends Component {
  @service router;
  @service currentUser;

  get shouldShow() {
    // Check if banner is enabled in settings
    if (!settings.show_banner) {
      return false;
    }
    
    if (!this.currentUser || this.router.currentRouteName !== "groups.index") {
      return false;
    }

    // Check trust level range
    const userTrustLevel = this.currentUser.trust_level;
    const minTL = settings.min_trust_level;
    const maxTL = settings.max_trust_level;
    
    return userTrustLevel >= minTL && userTrustLevel <= maxTL;
  }

  <template>
    {{#if this.shouldShow}}
      <div class="groups-welcome-banner">
        <h2 class="banner-heading">Welcome to Public Happiness Movement!</h2>
        <p class="banner-subheading">Please join a group below to connect with others who share your interests.</p>
      </div>
    {{/if}}
  </template>
}
