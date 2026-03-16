# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A single-page PWA (Progressive Web App) for collecting post-event feedback and generating PDF reports. Written in French. The entire application lives in one `index.html` file containing all HTML, CSS, and JavaScript — no build system, no framework, no bundler.

## Development

No build or install steps. Open `index.html` directly in a browser or serve it with any static file server:

```bash
python3 -m http.server 8000
```

Deployed via GitHub Pages from the `master` branch root.

## Architecture

- **`index.html`** — The entire application: form UI, styling, modal/recap display, PDF generation logic, and service worker registration. All in a single file (~585 lines).
- **`sw.js`** — Service worker using a "network first" caching strategy. Bump `CACHE_NAME` version (currently `feedback-v4`) when updating cached assets.
- **`manifest.json`** — PWA manifest for installability on mobile devices.

### Key patterns in `index.html`

- **Form sections**: 6 numbered feedback sections (déroulé, F&B, technique, staff, horaires, autres) plus an info header section.
- **Conditional fields**: Radio buttons toggle visibility of detail sections via `.conditional.visible` CSS class.
- **Data flow**: Form submit → `FormData` → `lastFeedback` object → displayed in modal recap → saved to `localStorage` under key `feedbacks`.
- **PDF generation**: Uses `html2canvas` + `jsPDF` (loaded from cdnjs CDN). Creates a temporary styled div in the DOM, captures it as a canvas, then generates a multi-page A4 PDF. The div is removed after capture.
- **Service worker auto-update**: Checks for updates every 60 seconds and auto-reloads the page when a new version is activated.

### External dependencies (CDN only)

- `jspdf` 2.5.1
- `html2canvas` 1.4.1
