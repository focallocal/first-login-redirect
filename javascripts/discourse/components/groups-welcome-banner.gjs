import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class GroupsWelcomeBanner extends Component {
  @service router;
  @service currentUser;

  get shouldShow() {
    // Only show on /g (groups index page) for trust level 0 users
    return (
      this.currentUser &&
      this.currentUser.trust_level === 0 &&
      this.router.currentRouteName === "groups.index"
    );
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
