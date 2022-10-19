import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, finalize, retry, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GetInterceptorService {
  constructor(
    private router: Router,
    // private toastr: ToastrService,
    private _comm: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this._comm.hideSpinner();
            if (event.status == 211) {
              //  this.toastr.error('Your session is expired, please log in.');
              localStorage.clear();
              return this.router.navigateByUrl("/");
            }
          }
        },
        (error) => {
          console.log(error, "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
          this._comm.hideSpinner();
          switch (error.status) {
            case 401:
              /***  Auto LogOut if Api response 401 ** */
              this._comm.errorMsg(
                "You have been loggedOut for security purpose."
              );
              this.router.navigate([`/auth`]);
              localStorage.clear();
              break;
            case 500:
              /*** If api does not respond  ** */
              this._comm.errorMsg("Api Not Working");
              break;

            default:
              if (error.error) {
                this._comm.errorMsg(error.error.message);
              } else {
                this._comm.errorMsg(error.message);
              }
          }
        }
      )
    );
  }
}
