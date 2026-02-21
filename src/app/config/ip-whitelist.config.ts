/**
 * IP Whitelist Configuration
 * Add your allowed IP addresses to this list
 */
export const IP_WHITELIST_CONFIG = {
  // Set to false to disable IP checking
  enabled: true,
  
  // List of allowed IP addresses
  // Add your IPs here
  allowedIPs: [
    '127.0.0.1',           // localhost
    '::1',                 // localhost (IPv6)
    '192.168.1.100',  
    '122.177.244.193'     // Example: Replace with your IP
    // Add more IPs as needed
  ],

  // API to get user's public IP (free options)
  ipApiUrl: 'https://api.ipify.org?format=json',
  
  // Alternative IP detection services (uncomment as needed)
  // ipApiUrl: 'https://ipapi.co/json/',
  // ipApiUrl: 'https://geolocation-db.com/json/',
};
