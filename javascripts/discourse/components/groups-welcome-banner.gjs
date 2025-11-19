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
        <strong>Welcome!</strong>
        Please join a group below to connect with others.
        Can't find what you need? Click "New Group" to create one.
      </div>
    {{/if}}
  </template>
}
