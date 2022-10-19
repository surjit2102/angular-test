import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { AppService } from "./app.service";
import { BehaviorSubject, Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { environment } from "../../../environments/environment";
import { FormGroup } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
// import * as io from "socket.io-client";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private headers: HttpHeaders = new HttpHeaders({
  //   "SECRET-API-KEY": this.appService.secretAPIKey,
  // });
  currentUser$: BehaviorSubject<any>;
  baseUrl: any = environment.base_url;
  token: any;
  user: any;
  socket: any;

  constructor(
    private httpClient: HttpClient,
    private _toastrService: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.currentUser$ = new BehaviorSubject(null);
    this.token = localStorage.getItem("accessToken") ;
  }

  // get apiUrl(): string {
  //   return this.appService.apiUrl;
  // }

  // async logIn(username: string, password: string) {
  //   try {
  //     // TO DO: contain expiry date / duration
  //     const response = await this.httpClient
  //       .post<TalinoCloudApiResponse<AuthDetails>>(
  //         `${this.apiUrl}/login`,
  //         { username, password },
  //         { headers: this.headers }
  //       )
  //       .toPromise();
  //     localStorage.setItem("fah_backoffice_user", JSON.stringify(username));
  //     localStorage.setItem(
  //       "fah_backoffice_store_id2",
  //       JSON.stringify(response.data.merchant_id)
  //     );
  //   } catch (err) {
  //     throw Error(err);
  //   }
  // }

  async logOut() {
    localStorage.clear();
  }



  getRequest(endPoint: string, params:any) {
    return this.httpClient.get(`${this.baseUrl}${endPoint}?${params}`);
  }

  getRequestWithID(endPoint: string, id:any) {
    return this.httpClient.get(`${this.baseUrl}${endPoint}${id}`);
  }

  getRequestWithoutbody(endPoint: any, queryParams: any) {
    return this.httpClient.get(`${this.baseUrl}${endPoint}`, {
      params: queryParams
    });
  }
  postRequestwithoutToken(endPoint: string, reqBody: any) {
    return this.httpClient.post(`${this.baseUrl}${endPoint}`, reqBody);
  }
  postRequest(endPoint: string, reqBody: { }) {
    return this.httpClient.post(`${this.baseUrl}${endPoint}`, reqBody);
  }
  postRequestById(endPoint: any, reqBody: any) {
    return this.httpClient.post(`${this.baseUrl}${endPoint}`, reqBody);
  }
  putWithID(url: string, id: string, putData: any = {}) {
    return this.httpClient.put<any>(`${this.baseUrl}${url}/${id}`, putData);
  }

  putRequest(endPoint: string, reqBody: { }) {
    return this.httpClient.put(`${this.baseUrl}${endPoint}`, reqBody);
  }

  deleteRequest(endPoint: string, id:any) {
    return this.httpClient.delete(`${this.baseUrl}${endPoint}/${id}`);
  }

  successMsg(message: string | undefined) {
    this._toastrService.success(message, "", {
      closeButton: true,
      timeOut: 4000,
    });
  }

  errorMsg(message: string | undefined) {
    this._toastrService.error(message, "", {
      closeButton: true,
      timeOut: 4000,
    });
  }

  showSpinner() {
    console.log("show spinner");
    this.spinner.show();
  }

  hideSpinner() {
    console.log("hide spinner");
    this.spinner.hide();
  }

  connection() {
    console.log("geterer");
    this.token = localStorage.getItem("accessToken");
    console.log(localStorage.getItem("adminData"), "locla user");

    // if (localStorage.getItem("adminData")) {
    //   this.user = JSON.parse(localStorage.getItem("adminData")|| "");
    //   console.log("SDfsdfd");
    //   this.socket = io.connect(environment.socket_url, {
    //     reconnection: true,
    //     reconnectionDelay: 1000,
    //     reconnectionDelayMax: 3000,
    //     reconnectionAttempts: Infinity,
    //     query: { token: this.token },
    //     transports: ["websocket", "polling", "flashsocket"],
    //   });
    //   console.log(this.socket, "socket");

    //   // this.socket.on('connect', res => {
    //   //   const data = {
    //   //     userId: 12
    //   //   };
    //   //   this.socket.emit('check', data);
    //   // });
    // }
  }
  getUserNotificationListener() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.removeListener("check");
      this.socket.on("check", (message: any) => {
        console.log("order", message);
        observer.next(message);
      });
    });
  }

  getOrderStatusChangeListener() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.removeListener("updateOrder");
      this.socket.on("updateOrder", (message: any) => {
        console.log("updateOrder", message);
        observer.next(message);
      });
    });
  }
  getOrderTrackingListener() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.removeListener("adminTrackingOrder");
      this.socket.on("adminTrackingOrder", (message: any) => {
        console.log("adminTrackingOrder", message);
        observer.next(message);
      });
    });
  }

  getScheduleOrderListener() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.removeListener("adminNotifyToUpdateScheduleOrder");
      this.socket.on("adminNotifyToUpdateScheduleOrder", (message: any) => {
        console.log("adminNotifyToUpdateScheduleOrder", message);
        observer.next(message);
      });
    });
  }
  OrderNotFoundSoundClose() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.removeListener("OrderNotFoundSoundClose");
      this.socket.on("OrderNotFoundSoundClose", (message: any) => {
        console.log("OrderNotFoundSoundClose", message);
        observer.next(message);
      });
    });
  }
  adminNotifyToUpdateScheduleOrder() {
    return Observable.create((observer: { next: (arg0: any) => void; }) => {
      this.socket.removeListener("adminNotifyToUpdateScheduleOrder");
      this.socket.on("adminNotifyToUpdateScheduleOrder", (message: any) => {
        console.log("adminNotifyToUpdateScheduleOrder", message);
        observer.next(message);
      });
    });
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
