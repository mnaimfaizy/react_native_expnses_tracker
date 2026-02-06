# React Native Expenses Tracker

A simple expenses tracking app built with **React Native (Expo)**.

It lets you create, view, edit, and delete expenses, and shows a quick summary of totals. Data is persisted to a **Firebase Realtime Database** via HTTP requests.

## What this app is for

This project is a lightweight personal finance demo / learning project that showcases:

- a multi-screen React Native app using React Navigation
- state management with React Context + `useReducer`
- remote CRUD with Axios
- basic validation and loading/error UX

## Key features

- **View expenses**
  - **Recent**: shows expenses from the last 7 days
  - **All expenses**: shows the full list
- **Add an expense**
  - amount, date (YYYY-MM-DD), description
  - input validation with inline error messaging
- **Edit an expense**
  - tap an item in the list to open it in the edit modal
- **Delete an expense** (edit screen only)
- **Totals summary**
  - summary card at the top showing the total for the active view
- **Network UX**
  - loading overlay while fetching/saving
  - error overlay when requests fail

## Screens & navigation

- Bottom Tabs
  - **Recent Expenses** (`RecentExpenses`)
  - **All Expenses** (`AllExpenses`)
- Stack Screen
  - **Manage Expense** (`ManageExpense`) shown as a **modal**

Navigation behavior:

- Tap the **+** icon in the header to open **Add Expense**.
- Tap an **expense item** to open **Edit Expense**.

## Data model

An expense item has the following shape in the app:

```ts
{
  id: string;
  description: string;
  amount: number;
  date: Date;
}
```

In Firebase Realtime Database, expenses are stored under `/expenses`.

## Tech stack

- **React Native** (via **Expo SDK 49**)
- **React 18**
- **React Navigation**
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **Firebase JS SDK** (`firebase`) for Realtime Database access
- **React Context + useReducer** for state management
- **Firebase Realtime Database** as the backend

## Project structure (high level)

- `App.js` – navigation container + tabs/stack setup + context provider
- `screens/` – screen components
- `components/` – UI + reusable components
- `store/expenses-context.js` – global expenses state + reducer
- `util/firebase.js` – Firebase initialization (reads Expo env vars)
- `util/http.js` – expenses CRUD (fetch, store, update, delete) using Firebase RTDB
- `util/date.js` – date helpers used throughout the UI

## Getting started (development)

### Prerequisites

- Node.js (a recent LTS is recommended)
- Yarn (this repo is configured for **Yarn 4** via `packageManager`)
- Expo CLI (run via `expo` through the local project)
- One of:
  - Expo Go app (physical device)
  - iOS Simulator (macOS)
  - Android Emulator

### Install

```bash
yarn install
```

If you don’t have Yarn 4 set up yet, Corepack is the easiest route:

```bash
corepack enable
yarn --version
```

### Run

Start the Expo dev server:

```bash
yarn start
```

Run on a platform:

```bash
yarn ios
yarn android
yarn web
```

## Scripts

From `package.json`:

- `yarn start` – start Expo
- `yarn ios` – start + open iOS
- `yarn android` – start + open Android
- `yarn web` – start web build

## Backend (Firebase Realtime Database)

This app uses the **Firebase JS SDK (modular API)**, initialized with the standard Firebase web app config (apiKey, projectId, appId, etc), as recommended by Expo when you want Firebase support in **Expo Go**.

Configuration lives in:

- `util/firebase.js` (reads `process.env.EXPO_PUBLIC_*`)

### Using your own Firebase project

1. Create a Firebase project in the Firebase console.
2. Register a **Web App** in Project Settings (this is how you obtain `apiKey`, `projectId`, `appId`, etc).
3. Enable **Realtime Database**.
4. Create a `.env` **or** `.env.local` file (you can start from `.env.example`) and fill in the Firebase config values.
5. Set database rules appropriately for development (for example, open read/write rules while testing).

After changing env vars, restart the Expo dev server (often safest with cache clear):

```bash
yarn start -c
```

Required env vars:

- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_DATABASE_URL`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

The app stores expenses under the `expenses/` path in Realtime Database.

### Realtime Database rules (important)

By default, Realtime Database rules are often **locked down**, which will cause fetch/save requests to fail with `PERMISSION_DENIED`.

For local development (no Authentication in this app yet), you can temporarily open reads/writes:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Notes:

- Rules must be **valid JSON** (no `//` comments, no trailing commas).
- Avoid time-based demo rules like `now < <timestamp>` unless you’re sure the timestamp won’t expire (an expired timestamp silently blocks all reads/writes).
- For production, add Firebase Authentication and lock rules down (for example, require `auth != null` and validate fields).

## Notes / troubleshooting

- **Date format**: the form expects `YYYY-MM-DD`.
- If you see “Could not fetch expenses!”, confirm your Firebase URL and rules.
- If iOS/Android launch fails, ensure you have a simulator/emulator set up, or use Expo Go.
- If Metro fails with `Unable to resolve "./postinstall.mjs"` (Firebase), this repo includes a `metro.config.js` that enables `.mjs`/`.cjs` resolution. Restart with `yarn start -c`.

---