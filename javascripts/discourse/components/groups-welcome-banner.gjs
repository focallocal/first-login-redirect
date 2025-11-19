import Component from "@glimmer/component";
import { service } from "@ember/service";

export default class GroupsWelcomeBanner extends Component {
  @service router;
  @service currentUser;

  get shouldShow() {
    // Only show on /g (groups index page) for trust level 0 users
    const show = this.currentUser &&
      this.currentUser.trust_level === 0 &&
      this.router.currentRouteName === "groups.index";
    
    console.log("🎯 Banner shouldShow:", {
      show,
      user: this.currentUser?.username,
      tl: this.currentUser?.trust_level,
      route: this.router.currentRouteName
    });
    
    return show;
  }

  <template>
    {{! Always render the div to test if outlet works }}
    <div class="groups-welcome-banner" style="background: linear-gradient(90deg, #6B4E9D 0%, #E91E63 15%, #FF5722 30%, #FF9800 45%, #FDD835 60%, #8BC34A 75%, #00BCD4 90%, #3F51B5 100%); padding: 3rem 2rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);">
      {{#if this.shouldShow}}
        <h2 style="font-size: 2.5em; font-weight: bold; color: white; margin: 0 0 1rem 0; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3);">
          Welcome to Public Happiness Movement!
        </h2>
        <p style="font-size: 1.25em; color: white; margin: 0; text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 0, 0, 0.3);">
          Please join a group below to connect with others who share your interests.
        </p>
      {{else}}
        <div style="color: white; opacity: 0.7;">
          DEBUG: Banner component loaded but not showing for this user/route
        </div>
      {{/if}}
    </div>
  </template>
}
