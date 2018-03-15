import { Component, ViewChild } from "@angular/core";
import { Nav, Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

// pages
import { HomePage } from "../pages/home/home";
import { SettingsPage } from "../pages/settings/settings";

// providers
import { SettingsProvider } from "../providers/settings";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string; icon: string; component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public settingsPrvdr: SettingsProvider
  ) {
    this.initializeApp();

    // array of the menu pages and their paramaters
    this.pages = [
      { title: "Home", icon: "ios-home-outline", component: HomePage },
      { title: "Settings", icon: "ios-hammer-outline", component: SettingsPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
