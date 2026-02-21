# IP Whitelist Implementation Guide

## Overview
Your Angular application now has IP whitelisting enabled. Only users with IP addresses in the whitelist can access the application. Unauthorized IPs will see an access denied error page.

## Files Created

1. **[src/app/config/ip-whitelist.config.ts](src/app/config/ip-whitelist.config.ts)** - Configuration file for IP whitelist
2. **[src/app/services/ip-whitelist.service.ts](src/app/services/ip-whitelist.service.ts)** - Service to check IP authorization
3. **[src/app/guards/ip-whitelist.guard.ts](src/app/guards/ip-whitelist.guard.ts)** - Route guard for IP verification
4. **[src/app/pages/access-denied/access-denied.component.ts](src/app/pages/access-denied/access-denied.component.ts)** - Error page for denied access
5. **[src/app/app.routes.ts](src/app/app.routes.ts)** - Updated routes (modified)

## How to Configure

### 1. Add Your IP Addresses

Edit [src/app/config/ip-whitelist.config.ts](src/app/config/ip-whitelist.config.ts) and add your IP addresses to the `allowedIPs` array:

```typescript
allowedIPs: [
  '127.0.0.1',           // localhost
  '::1',                 // localhost (IPv6)
  '192.168.1.100',       // Your IP - Replace this!
  '203.0.113.45',        // Another authorized IP
  // Add more as needed
],
```

### 2. Enable/Disable IP Checking

In the same config file, toggle IP checking:

```typescript
enabled: true,   // Set to false to disable IP checking
```

### 3. Different IP Detection Services

You can use different IP detection APIs. The default is ipify, but alternatives are:

```typescript
// Default (ipify)
ipApiUrl: 'https://api.ipify.org?format=json',

// Alternative: ipapi.co
ipApiUrl: 'https://ipapi.co/json/',

// Alternative: geolocation-db
ipApiUrl: 'https://geolocation-db.com/json/',
```

## How It Works

1. **User visits app** → Route guard activates
2. **IP check guard intercepts** → Calls `IpWhitelistService`
3. **Service fetches user's IP** → Uses public IP detection API
4. **Service checks whitelist** → Compares against configured IPs
5. **If allowed** → Access granted, route navigates normally
6. **If denied** → Redirects to `/access-denied` page with error details

## Error Page Features

The access denied component shows:
- User's current IP address
- Error message
- "Go to Home" button
- "Contact Support" button (sends email to configured address)

To customize the support email, edit [src/app/pages/access-denied/access-denied.component.ts](src/app/pages/access-denied/access-denied.component.ts):

```typescript
const email = 'admin@example.com'; // Change to your support email
```

## Testing

### Test with Your IP
1. Find your public IP: Visit https://whatismyipaddress.com or https://ipify.org
2. Add it to the whitelist
3. Test access - should work

### Test with Different IP (Development)
1. Disable IP checking in config:
   ```typescript
   enabled: false
   ```
   This allows testing without IP restrictions

### Test Access Denied Page
1. Add a fake IP to whitelist (e.g., '10.0.0.1')
2. Enable IP checking
3. Access the app - should redirect to access denied page

## Advanced Usage

### Programmatically Add/Remove IPs

Use the service methods:

```typescript
constructor(private ipWhitelistService: IpWhitelistService) {}

// Add IP at runtime
this.ipWhitelistService.addIPToWhitelist('192.168.1.200');

// Remove IP
this.ipWhitelistService.removeIPFromWhitelist('192.168.1.100');

// Get current whitelisted IPs
const config = this.ipWhitelistService.getWhitelistConfig();
console.log(config.allowedIPs);

// Get user's current IP
const userIP = this.ipWhitelistService.getUserIP();
```

### Check IP in Components

```typescript
import { IpWhitelistService } from './services/ip-whitelist.service';

export class MyComponent implements OnInit {
  constructor(private ipWhitelistService: IpWhitelistService) {}

  ngOnInit() {
    this.ipWhitelistService.checkIPAccess().subscribe(result => {
      console.log('IP Check Result:', result);
      // result.allowed: boolean
      // result.userIP: string | null
      // result.message: string
    });
  }
}
```

## Security Considerations

⚠️ **Important:** Frontend IP checking is NOT secure:
- IPs can be spoofed
- Checking happens in the browser (can be bypassed)
- Should NOT be used for sensitive data alone

**Best Practice:** Combine frontend check with backend verification for true security.

### Add Backend IP Verification

For production security, also implement IP checking in your backend:

```typescript
// NestJS example
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class IpWhitelistMiddleware {
  private allowedIPs = ['192.168.1.100', '203.0.113.45'];

  checkIP(request: any): void {
    const clientIP = request.ip;
    if (!this.allowedIPs.includes(clientIP)) {
      throw new ForbiddenException(`IP ${clientIP} is not authorized`);
    }
  }
}
```

## Troubleshooting

### "Could not fetch IP" error?
- Check internet connection
- IP detection API might be down
- The app gracefully allows access on fetch failure

### Users in different regions blocked?
- Some networks use shared IPs or proxies
- Configure whitelist for network IP ranges
- Consider CIDR notation if supported

### All users being blocked?
1. Check if IP checking is enabled in config
2. Verify allowed IPs list is not empty
3. Check default allowed IPs (127.0.0.1, ::1 are for localhost only)

## Configuration Examples

### Allow Only Localhost (Development)
```typescript
allowedIPs: [
  '127.0.0.1',
  '::1',
],
```

### Allow Corporate Network
```typescript
allowedIPs: [
  '203.0.113.0',      // Office public IP
  '203.0.113.1',      // Backup office IP
  '198.51.100.50',    // VPN IP
],
```

### Allow Testing + Production
```typescript
allowedIPs: [
  '127.0.0.1',              // Local dev
  '192.168.1.100',          // Local network
  '203.0.113.45',           // Production server
  '198.51.100.100',         // Staging server
],
```

## Disabling IP Check

To disable IP whitelisting completely (development/testing):

```typescript
export const IP_WHITELIST_CONFIG = {
  enabled: false,  // Disable IP checking
  allowedIPs: [],
  ipApiUrl: 'https://api.ipify.org?format=json',
};
```

Or use environment-based config:

```typescript
export const IP_WHITELIST_CONFIG = {
  enabled: !isDevMode(),  // Only enabled in production
  allowedIPs: [...],
  ipApiUrl: 'https://api.ipify.org?format=json',
};
```

## Next Steps

✅ Update IP whitelist in [src/app/config/ip-whitelist.config.ts](src/app/config/ip-whitelist.config.ts)
✅ Test with your IP address
✅ Update support email in [src/app/pages/access-denied/access-denied.component.ts](src/app/pages/access-denied/access-denied.component.ts)
✅ Deploy and monitor access

## Support

For issues:
1. Check console errors (F12 → Console)
2. Verify your IP is in whitelist
3. Test with IP checking disabled temporarily
4. Check the access denied page for your current IP
