import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IpWhitelistService } from '../services/ip-whitelist.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IpWhitelistGuard implements CanActivate {
  constructor(
    private ipWhitelistService: IpWhitelistService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.ipWhitelistService.checkIPAccess().pipe(
      map(result => {
        if (!result.allowed) {
          // Store denial reason in sessionStorage for display on error page
          sessionStorage.setItem('ipCheckResult', JSON.stringify(result));
          // Redirect to access denied page
          this.router.navigate(['/access-denied']);
          return false;
        }
        return true;
      })
    );
  }
}
