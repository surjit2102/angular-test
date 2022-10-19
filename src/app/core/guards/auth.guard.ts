import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { switchMap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  isOnboarding: boolean = false;
  constructor(private router: Router) {}

  private check(next): Observable<boolean> {
    if (
      next.routeConfig.path === "auth" ||
      next.routeConfig.path === "forgot"
    ) {
      this.isOnboarding = true;
      if (localStorage.getItem("accessToken")) {
        this.router.navigateByUrl("dashboard");
        return of(false);
      } else {
        // this.router.navigateByUrl("auth");
        return of(true);
      }
    } else {
      this.isOnboarding = false;
      if (!localStorage.getItem("accessToken")) {
        this.router.navigateByUrl("auth");
        return of(false);
      } else {
        return of(true);
      }
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(route);
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.check(childRoute);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.check(route);
  }
}
