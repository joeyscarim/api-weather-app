import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

// providers
import { ApiProvider } from "../providers/api";
import { ToastProvider } from "../providers/toast";

@Injectable()
export class SettingsProvider {
  // settings object
  settings = {
    location: <string>null,
    woeid: <string>null,
    units: <string>null,
    theme: <string>null
  };

  constructor(
    public storage: Storage,
    public apiPrvdr: ApiProvider,
    public toastPrvdr: ToastProvider
  ) {}

  // save settings to storage
  saveSettings() {
    this.storage.set("settings", this.settings);
    this.toastPrvdr.presentToast("Settings updated!");
  }

  // allSettings
  get allSettings() {
    return this.settings;
  }

  // load settings from storage, or get defaults if none
  load() {
    return this.storage.get("settings").then(value => {
      if (value) {
        this.settings = value;
      } else {
        this.settings = this.getDefaults();
      }
    });
  }

  // set a new value for an attribute
  setAttribute(attribute, value) {
    this.settings[attribute] = value;
  }

  // get the default settings, if none are applied
  getDefaults(): {
    location: string;
    woeid: string;
    units: string;
    theme: string;
  } {
    return {
      location: "Denver",
      woeid: "2391279",
      units: "F",
      theme: "light-theme"
    };
  }

  // clear all settings and set to defaults
  clearAllSettings() {
    this.storage.set("settings", null);
    this.toastPrvdr.presentToast("Settings reset to default.");
    this.settings = this.getDefaults();
  }
}
