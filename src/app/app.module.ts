import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";

import { MyApp } from "./app.component";

// Moment.js
import { MomentModule } from "angular2-moment";

// ionic native plugins
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { InAppBrowser } from "@ionic-native/in-app-browser";

// pages
import { HomePage } from "../pages/home/home";
import { SettingsPage } from "../pages/settings/settings";

// providers
import { ApiProvider } from "../providers/api";
import { SettingsProvider } from "../providers/settings";
import { ToastProvider } from "../providers/toast";

@NgModule({
  declarations: [MyApp, HomePage, SettingsPage],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    MomentModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, SettingsPage],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    ApiProvider,
    SettingsProvider,
    ToastProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
