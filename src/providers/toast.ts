import { Injectable } from "@angular/core";
import { App, ToastController } from "ionic-angular";

@Injectable()
export class ToastProvider {
  constructor(public app: App, public toastCtrl: ToastController) {}

  // present a simple toast alert
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: "top"
    });

    toast.present();
  }
}
