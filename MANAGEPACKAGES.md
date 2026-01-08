# NPM / Expo Dependencies Install List

## State Management

### Redux Toolkit (RTK)
Used for global application state, auth session, cached entities.
Includes Redux core + best practices.

npm install @reduxjs/toolkit react-redux

---

## Server State / Data Fetching

### React Query (TanStack Query)
Used for async server state:
- document processing status
- reports fetching
- retries, caching, background refetch

npm install @tanstack/react-query

---

## Navigation (Expo compatible)

### React Navigation (Native Stack)
Main navigation system for Expo React Native apps.

npm install @react-navigation/native
npm install @react-navigation/native-stack

### Required Expo dependencies for navigation
Handled automatically by Expo.

npx expo install react-native-screens react-native-safe-area-context

---

## File & Image Import (Camera / Files)

### Expo Image Picker
Used for:
- camera capture
- gallery image selection

npx expo install expo-image-picker

### Expo Document Picker
Used for:
- PDF upload
- file selection from device

npx expo install expo-document-picker

### Expo File System
Used for:
- reading files
- uploading to backend
- temporary storage

npx expo install expo-file-system

---

## Styling

### NativeWind (Tailwind for React Native)
Tailwind-style utility classes for React Native components.

npm install nativewind
npm install --save-dev tailwindcss

### Tailwind config init
Required once after install.

npx tailwindcss init

### Babel plugin (required for NativeWind)
Add to babel.config.js

plugins: ["nativewind/babel"]

---

## Optional but Recommended

### Async Storage
Used for:
- auth persistence
- small local flags

npx expo install @react-native-async-storage/async-storage

---

End of install list.
