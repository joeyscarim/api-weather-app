import { Injectable } from "@angular/core";
import { Http, RequestOptions, URLSearchParams } from "@angular/http";
import "rxjs/add/operator/map";
import { App } from "ionic-angular";

// providers
import { ToastProvider } from "../providers/toast";

@Injectable()
export class ApiProvider {
  // location of the api
  url: string = "https://www.metaweather.com/api";

  constructor(
    public http: Http,
    public app: App,
    public toastPrvdr: ToastProvider
  ) {}

  // make a get request to the api url, with the passed endpoint and params
  get(endpoint: string, params?: any) {
    let options = new RequestOptions();

    // use url search params to pass params
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      options.search = p;
    }

    return this.http.get(this.url + "/" + endpoint, options);
  }

  // show error toast on get call error
  error() {
    this.toastPrvdr.presentToast("Connection error. Please try again.");
  }
}
