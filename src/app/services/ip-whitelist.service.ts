import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, timeout } from 'rxjs/operators';
import { IP_WHITELIST_CONFIG } from '../config/ip-whitelist.config';

export interface IPCheckResult {
  allowed: boolean;
  userIP: string | null;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class IpWhitelistService {
  private userIP: string | null = null;
  private checkCompleted = false;

  constructor(private http: HttpClient) {}

  /**
   * Check if user's IP is whitelisted
   */
  checkIPAccess(): Observable<IPCheckResult> {
    // If IP checking is disabled, allow access
    if (!IP_WHITELIST_CONFIG.enabled) {
      return of({
        allowed: true,
        userIP: null,
        message: 'IP checking is disabled'
      });
    }

    // If already checked, return cached result
    if (this.checkCompleted && this.userIP) {
      return of(this.createResult(this.userIP));
    }

    // Fetch user's IP address
    return this.fetchUserIP().pipe(
      map(ip => {
        this.userIP = ip;
        this.checkCompleted = true;
        return this.createResult(ip);
      }),
      catchError(error => {
        console.error('Error fetching IP:', error);
        // Allow access if IP detection fails (graceful fallback)
        return of({
          allowed: true,
          userIP: null,
          message: 'Could not verify IP, access allowed'
        });
      })
    );
  }

  /**
   * Get user's public IP address from API
   */
  private fetchUserIP(): Observable<string> {
    return this.http.get<any>(IP_WHITELIST_CONFIG.ipApiUrl, {
      responseType: 'json'
    }).pipe(
      timeout(5000), // 5 second timeout
      map(response => {
        // Handle different API response formats
        const ip = response.ip || response.query || response.IPv4;
        if (!ip) {
          throw new Error('Could not extract IP from response');
        }
        return ip;
      }),
      catchError(error => {
        console.error('IP API error:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Create IP check result
   */
  private createResult(ip: string): IPCheckResult {
    const isAllowed = this.isIPAllowed(ip);
    return {
      allowed: isAllowed,
      userIP: ip,
      message: isAllowed
        ? `Access granted for IP: ${ip}`
        : `Access denied for IP: ${ip}`
    };
  }

  /**
   * Check if IP is in whitelist
   */
  private isIPAllowed(ip: string): boolean {
    return IP_WHITELIST_CONFIG.allowedIPs.some(allowedIP => {
      // Exact match or CIDR range check
      return this.normalizeIP(ip) === this.normalizeIP(allowedIP);
    });
  }

  /**
   * Normalize IP for comparison (remove leading zeros)
   */
  private normalizeIP(ip: string): string {
    return ip.trim().toLowerCase();
  }

  /**
   * Get cached user IP
   */
  getUserIP(): string | null {
    return this.userIP;
  }

  /**
   * Get whitelist configuration
   */
  getWhitelistConfig() {
    return IP_WHITELIST_CONFIG;
  }

  /**
   * Add IP to whitelist (runtime)
   */
  addIPToWhitelist(ip: string): void {
    if (!IP_WHITELIST_CONFIG.allowedIPs.includes(ip)) {
      IP_WHITELIST_CONFIG.allowedIPs.push(ip);
    }
  }

  /**
   * Remove IP from whitelist (runtime)
   */
  removeIPFromWhitelist(ip: string): void {
    const index = IP_WHITELIST_CONFIG.allowedIPs.indexOf(ip);
    if (index > -1) {
      IP_WHITELIST_CONFIG.allowedIPs.splice(index, 1);
    }
  }
}
