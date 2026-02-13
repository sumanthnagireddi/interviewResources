const fs = require('fs');
const path = require('path');

// Read Firebase config from environment variable
const firebaseConfig = process.env.FIREBASE_CONFIG;

if (!firebaseConfig) {
  console.error('❌ Error: FIREBASE_CONFIG environment variable is not set');
  process.exit(1);
}

let config;
try {
  config = JSON.parse(firebaseConfig);
} catch (error) {
  console.error('❌ Error: Failed to parse FIREBASE_CONFIG JSON:', error.message);
  process.exit(1);
}

// Generate environment.ts file
const environmentContent = `export const environment = {
  production: true,
  API_URL: 'https://webservices-rqvr.onrender.com',
  firebase: {
    projectId: '${config.projectId}',
    appId: '${config.appId}',
    storageBucket: '${config.storageBucket}',
    apiKey: '${config.apiKey}',
    authDomain: '${config.authDomain}',
    messagingSenderId: '${config.messagingSenderId}',
    measurementId: '${config.measurementId}',
  },
};
`;

const environmentPath = path.join(__dirname, 'src', 'environments', 'environment.ts');

try {
  fs.writeFileSync(environmentPath, environmentContent, 'utf8');
  console.log('✅ Successfully generated environment.ts from FIREBASE_CONFIG');
} catch (error) {
  console.error('❌ Error: Failed to write environment.ts:', error.message);
  process.exit(1);
}
