import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ActionSheetController,
  AlertController
} from "ionic-angular";

// ionic native plugins
import { InAppBrowser } from "@ionic-native/in-app-browser";

// providers
import { ApiProvider } from "../../providers/api";
import { SettingsProvider } from "../../providers/settings";
import { ToastProvider } from "../../providers/toast";

@Component({
  selector: "page-settings",
  templateUrl: "settings.html"
})
export class SettingsPage {
  darkMode: boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public settingsPrvdr: SettingsProvider,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public apiPrvdr: ApiProvider,
    private iab: InAppBrowser,
    public toastPrvdr: ToastProvider
  ) {
    // set the toggle for dark mode
    if (this.settingsPrvdr.settings.theme === "dark-theme") {
      this.darkMode = true;
    } else {
      this.darkMode = false;
    }
  }

  // search for a new woeid, Where On Earth ID
  // this is the paramater that the API uses to retrieve weather info
  searchForWoeid() {
    let prompt = this.alertCtrl.create({
      title: "Location",
      message: "Enter any major city name",
      inputs: [
        {
          name: "city",
          placeholder: "City"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Update",
          handler: data => {
            this.apiPrvdr
              .get("api/location/search/", { query: data.city })
              .map(res => {
                return res.json();
              })
              .subscribe(
                res => {
                  if (!res.length) {
                    this.toastPrvdr.presentToast("City not found!");
                  } else {
                    this.settingsPrvdr.settings.woeid = res[0].woeid;
                    this.settingsPrvdr.settings.location = res[0].title;

                    this.settingsPrvdr.saveSettings();
                  }
                },
                err => {
                  this.apiPrvdr.error();
                }
              );
          }
        }
      ]
    });
    prompt.present();
  }

  changeTheme() {
    if (this.settingsPrvdr.settings.theme === "dark-theme") {
      this.settingsPrvdr.setAttribute("theme", "light-theme");
      this.settingsPrvdr.saveSettings();
    } else {
      this.settingsPrvdr.setAttribute("theme", "dark-theme");
      this.settingsPrvdr.saveSettings();
    }
  }

  chooseUnits() {
    // launch an action sheet here...
    let actionSheet = this.actionSheetCtrl.create({
      title: "Choose Units"
    });

    //add the farenheight button
    let button = {
      text: "Farenheight",
      handler: () => {
        this.settingsPrvdr.setAttribute("units", "F");
        this.settingsPrvdr.saveSettings();
      }
    };
    actionSheet.addButton(button);

    //add the celcius button
    button = {
      text: "Celcius",
      handler: () => {
        this.settingsPrvdr.setAttribute("units", "C");
        this.settingsPrvdr.saveSettings();
      }
    };
    actionSheet.addButton(button);

    // assign and add the cancel button
    let cancelButton = {
      text: "Cancel",
      role: "cancel"
    };
    actionSheet.addButton(cancelButton);

    // present the action sheet
    actionSheet.present();
  }

  clearAllSettings() {
    this.darkMode = false;
    this.settingsPrvdr.clearAllSettings();
  }

  visitLink(url) {
    const browser = this.iab.create(url, "_system");
  }
}
