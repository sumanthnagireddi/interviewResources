# Environment Configuration

This project uses GitHub Secrets to manage sensitive Firebase credentials during CI/CD deployment.

## 🔐 GitHub Secret Setup

You need to add **one secret** to your GitHub repository:

### `FIREBASE_CONFIG`

A JSON object containing your Firebase configuration:

```json
{
  "projectId": "sumanthnagireddi-interview",
  "appId": "1:690782833147:web:85e61606f3f76fe1b7a35e",
  "storageBucket": "sumanthnagireddi-interview.appspot.com",
  "apiKey": "AIzaSyC_y_0iJAjkfcgsSIawGrcIOIPvF19sxi4",
  "authDomain": "sumanthnagireddi-interview.firebaseapp.com",
  "messagingSenderId": "690782833147",
  "measurementId": "G-S8V59ELZD2"
}
```

### How to Add the Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `FIREBASE_CONFIG`
5. Value: Paste the JSON object above (use your actual Firebase credentials)
6. Click **Add secret**

## 🏠 Local Development

For local development, you need to manually update the environment files with your Firebase credentials:

1. Open `src/environments/environment.ts` (for production builds)
2. Open `src/environments/environment.development.ts` (for dev server)
3. Replace the placeholder values with your actual Firebase config

**Note:** These files are gitignored, so your local credentials won't be committed to the repository.

## 🚀 How It Works

1. **GitHub Actions** runs when you push to `master` or create a PR
2. The workflow executes `node server.js` with the `FIREBASE_CONFIG` environment variable
3. `server.js` reads the secret and generates `src/environments/environment.ts`
4. The Angular build uses this generated file
5. The app is deployed to Firebase Hosting with the correct configuration

## 📝 Files Involved

- `server.js` - Script that generates environment.ts from FIREBASE_CONFIG
- `src/environments/environment.ts` - Production environment (gitignored)
- `src/environments/environment.development.ts` - Development environment (gitignored)
- `.github/workflows/firebase-hosting-merge.yml` - Main deployment workflow
- `.github/workflows/firebase-hosting-pull-request.yml` - PR preview workflow
