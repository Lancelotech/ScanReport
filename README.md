# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
# Project Name: ScanReport (working title)

## Product Specification

This project is a mobile application for scanning documents or files,
extracting structured data using an AI (LMM/LLM agent),
and presenting the extracted data as a readable report linked to a user account.

The main goal is to digitize unstructured documents (images, PDFs)
into structured, editable data.

---

## Core Features

### 1. Authentication
- User signup and login (email/password, social login optional)
- Each scanned document and report is linked to a specific user
- Secure access: users can only see their own documents and reports

---

### 2. Document Scanning & Upload
- Scan documents using device camera
- Upload files (PDF, JPG, PNG)
- Support multi-page documents (PDF or multiple images)
- Preprocessing:
  - Auto-crop
  - Perspective correction
  - Image enhancement for better text recognition

---

### 3. AI Data Extraction (LMM Agent)
- Use OCR and/or Large Multimodal Model (LMM) to extract data
- Convert unstructured content into structured JSON
- Extraction is schema-based (predefined fields)
- Support different document types (e.g. receipt, invoice, form, other)

Example extracted fields:
- Name
- Date
- Numbers / IDs
- Amounts
- Custom fields depending on document type

---

### 4. Report Generation
- Display extracted data as a structured report
- Allow manual editing and correction of extracted fields
- Show confidence level or warnings for uncertain fields
- Save final report version

---

### 5. History & Storage
- History of scanned documents
- View document status:
  - uploading
  - processing
  - ready
  - failed
- Re-open past reports
- Optional export (PDF / share)

---

### 6. Security & Privacy
- Documents and reports are private per user
- Secure file storage
- Option to delete original files after processing
- No document is shared without user action

---

## Technical Notes

- Frontend: React Native (Expo)
- Backend: Firebase (Auth, Firestore, Storage, Cloud Functions)
- AI processing is asynchronous
- UI must handle loading and processing states clearly

---

## MVP Scope

Minimum viable version includes:
- Login / Signup
- Upload or scan document
- AI extraction to structured JSON
- Report screen with editable fields
- Document history list

---

## Non-Goals (Out of Scope for MVP)
- Advanced analytics
- Team sharing
- Admin dashboards
- Real-time collaboration

---

End of specification.
