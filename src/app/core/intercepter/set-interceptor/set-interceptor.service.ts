import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError, finalize, retry, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class SetInterceptorService {
  constructor(private commonService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.commonService.showSpinner();
    const clonedReq = this.handleRequest(req);
    return next.handle(clonedReq);
    //     return next.handle(clonedReq).pipe(finalize( ()=>

    // ));
  }
  handleRequest(req: HttpRequest<any>) {
    const user = localStorage.getItem("accessToken");
    // const admin =localStorage.getItem('isAdmin');

    let authReq;
    if (
      (req.method.toLowerCase() === "post" ||
        req.method.toLowerCase() === "put") &&
      req.body instanceof FormData
    ) {
      authReq = req.clone({
        headers: new HttpHeaders({
          Authorization: user ? user : "",
          "cache-control": "no-cache",
        }),
      });
    } else {
      authReq = req.clone({
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Authorization: user ? user : "",
          "cache-control": "no-cache",
        }),
      });
    }
    return authReq;
  }
}
