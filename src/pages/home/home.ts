import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";

// Moment.js
import moment from "moment";

// providers
import { ApiProvider } from "../../providers/api";
import { SettingsProvider } from "../../providers/settings";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  loading: any;

  currentSettings: any;

  units: string = "F"; // default

  bannerBackground: string;

  weather = {
    weather_state_abbr: <string>null,
    sun_rise: <string>null,
    sun_set: <string>null,
    time: <string>null,
    the_temp: <string>null,
    weather_state_name: <string>null,
    title: <string>null
  };

  constructor(
    public navCtrl: NavController,
    public apiPrvdr: ApiProvider,
    public settingsPrvdr: SettingsProvider,
    public loadingCtrl: LoadingController
  ) {
    // create and present a loading screen
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loading.present();

    // load the current settings, or defaults
    this.settingsPrvdr.load().then(() => {
      this.currentSettings = this.settingsPrvdr.allSettings;
      this.units = this.currentSettings.units;
      // call the api
      this.loadData();
    });
  }

  // when refresh icon is hit, present new loading screen and load data
  refreshData() {
    // create and present a loading screen
    this.loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loading.present();

    // call the api
    this.loadData();
  }

  // call the API via our API Provider using our set woeid
  loadData() {
    this.apiPrvdr
      .get("location/" + this.currentSettings.woeid)
      .map(res => {
        return res.json();
      })
      .subscribe(
        res => {
          // set the values for our weather object properties
          // using the API call results
          this.weather = {
            weather_state_abbr: res.consolidated_weather[0].weather_state_abbr,
            sun_rise: res.sun_rise.substring(0, res.sun_rise.lastIndexOf(".")),
            sun_set: res.sun_set.substring(0, res.sun_set.lastIndexOf(".")),
            time: res.time.substring(0, res.time.lastIndexOf(".")),
            the_temp: res.consolidated_weather[0].the_temp,
            weather_state_name: res.consolidated_weather[0].weather_state_name,
            title: res.title
          };

          // convert to farenheight if units == F
          if (this.units == "F") {
            this.weather.the_temp = (
              parseInt(this.weather.the_temp) * 1.8 +
              32
            ).toString();
          }

          // gets the current hour in miltary time
          let hour = parseInt(moment(this.weather.time).format("HH"));

          // set the banner background color based on time of day
          switch (true) {
            case hour >= 2 && hour < 6:
              this.bannerBackground = "#141b2e";
              break;
            case hour >= 6 && hour < 10:
              this.bannerBackground = "#8ecefe";
              break;
            case hour >= 10 && hour < 14:
              this.bannerBackground = "#74acd2";
              break;
            case hour >= 14 && hour < 18:
              this.bannerBackground = "#3d77a5";
              break;
            case hour >= 18 && hour < 22:
              this.bannerBackground = "#2f567f";
              break;
            default:
              this.bannerBackground = "#1d2b44";
          }

          this.loading.dismiss();
        },
        err => {
          this.loading.dismiss();
          this.apiPrvdr.error();
        }
      );
  }
}
