# WEDIGIStudio Internship Journey — React

A complete responsive single-page internship portfolio built with React, Vite, Framer Motion, Lucide React, and custom CSS. Black and orange cinematic visual direction.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
npm run preview
```

## Add approved project links

Open `src/App.jsx` and update the `projectLinks` object near the top:

```js
const projectLinks = {
  companyWebsite: 'https://your-approved-link.example',
  webApplication: 'https://your-approved-link.example',
  landingPage: 'https://your-approved-link.example',
};
```

Leave a value as an empty string to display “Project link coming soon.” Project/client names are anonymized by default.

## Deploy

Push this folder to a Git repository and import it into Vercel. Vercel should detect Vite automatically. Build command: `npm run build`; output directory: `dist`.
