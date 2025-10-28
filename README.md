# Give Me Money (Expo React Native)

Plain white screen with donation buttons for PayPal, Venmo, and Cash App.

## Quick start

1) Install Node.js LTS (includes npm): `https://nodejs.org`

2) Install Expo CLI (uses npx, no global install required):

```bash
npm install -g expo-cli # optional, you can also use: npx expo start
```

3) Install dependencies:

```bash
npm install
```

4) Start the app:

```bash
npm run start
```

5) Open on your device with the Expo Go app (Android/iOS) or press `w` for web.

## Customize your handles

Edit `App.js` and replace placeholders:

- `YOURUSERNAME` in `PAYPAL_LINK` → like `https://paypal.me/yourname`
- `YOURUSERNAME` in `VENMO_APP` and `VENMO_WEB` → your Venmo handle
- `YOURUSERNAME` in `CASH_APP` → like `https://cash.app/$yourname`

## Notes

- Venmo deep link tries the app first and falls back to the web profile if the app isn't installed.
- This is a minimal Expo setup; no native code changes required.


