import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class GroupsWelcomeBanner extends Component {
  @service router;
  @service currentUser;

  get shouldShow() {
    console.log("🎯 Banner shouldShow check:", {
      hasUser: !!this.currentUser,
      trustLevel: this.currentUser?.trust_level,
      routeName: this.router.currentRouteName,
      result: this.currentUser &&
        this.currentUser.trust_level === 0 &&
        this.router.currentRouteName === "groups.index"
    });
    
    // Only show on /g (groups index page) for trust level 0 users
    return (
      this.currentUser &&
      this.currentUser.trust_level === 0 &&
      this.router.currentRouteName === "groups.index"
    );
  }

  <template>
    <div class="groups-welcome-banner" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
      {{#if this.shouldShow}}
        <strong>Welcome!</strong>
        Please join a group below to connect with others.
        Can't find what you need? Click "New Group" to create one.
      {{else}}
        <div style="opacity: 0.5;">DEBUG: Banner loaded but not showing (TL{{this.currentUser.trust_level}} on {{this.router.currentRouteName}})</div>
      {{/if}}
    </div>
  </template>
}
