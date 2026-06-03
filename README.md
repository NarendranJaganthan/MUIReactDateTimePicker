# InnoVites Date Time Picker

Mendix pluggable widget by **[InnoVites](https://www.innovites.com/)** for selecting dates and times in Mendix 9+ web apps (React client). The picker UI uses [MUI X Date and Time Pickers](https://mui.com/x/react-date-pickers/) (desktop layout, analog time clock, AM/PM) and [date-fns](https://date-fns.org/) for parsing and locales. Styling follows InnoVites brand colors (gold accent `#f7a823`, warm cream surfaces).

| | |
|---|---|
| **Widget ID** | `innovites.muireactdatetimepicker.MUIReactDateTimePicker` |
| **Package** | `innovites.MUIReactDateTimePicker.mpk` |
| **Version** | 1.0.0 |
| **Platform** | Web (React client) |
| **License** | MIT |

**Full widget documentation (installation, Studio Pro properties, formats, use cases, troubleshooting):** [docs/WIDGET_DOCUMENTATION.md](docs/WIDGET_DOCUMENTATION.md)

---

## Features

- **Three modes:** date & time, date only, or time only
- **MUI X desktop UI:** calendar + analog [Time Clock](https://mui.com/x/react-date-pickers/time-clock/), footer with Today / Cancel / OK
- **12-hour / 24-hour:** follows locale; optional custom `date-fns` format strings
- **Locales:** `date-fns` locales (e.g. `en`, `nl`, `de`, `fr`, `es`, …)
- **Validation:** min/max date, disable past, optional “Valid date” boolean attribute
- **Time constraints:** min/max hours, minutes, seconds; hour/minute/second steps
- **UX:** clearable field, week numbers, read-only as control or text, Studio Pro design preview

---

## Requirements

- **Node.js** 16 or later
- **Mendix Studio Pro** 9.x with React client enabled
- **npm** (or compatible package manager)

---

## Quick start (Mendix)

1. Clone or copy this repository.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Set your Mendix test app path in `package.json`:

   ```json
   "config": {
     "projectPath": "../../YourMendixApp"
   }
   ```

4. Build the widget:

   ```bash
   npm run build
   ```

5. Copy **one** package into your app’s `widgets` folder:

   `dist/1.0.0/innovites.MUIReactDateTimePicker.mpk`

6. In Studio Pro, add **InnoVites Date Time Picker** to a page and bind the **DateTime** attribute.

> **Important:** Only one `.mpk` with this widget ID may exist in `widgets/`. Remove the old `innovites.reactdatetimepicker.*` or `innovites.ReactDateTimePicker.mpk` packages if present, or Studio Pro will report that widget packages could not be read.

---

## UI prototype (no Mendix)

Run a local Vite app to try the same React UI used in the widget:

```bash
npm install
npm run prototype
```

Open **http://localhost:5173** — three cards demonstrate datetime, date-only, and time-only modes.

---

## Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Watch build + hot reload with Mendix (`config.mendixHost`, default `http://localhost:8080`) |
| `npm run start` | Watch build and copy widget into the test project `widgets` folder |
| `npm run build` | Production build → `dist/1.0.0/*.mpk` |
| `npm run lint` | ESLint via Mendix pluggable-widgets-tools |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run release` | Release build (after `prerelease` / lint) |

### Project layout

```
src/
  MUIReactDateTimePicker.tsx       # Mendix container (class component)
  ReactDateTimePickerUI.tsx        # MUI X pickers + date-fns logic
  MuiPickerProvider.tsx            # Theme + LocalizationProvider
  muiTimeViewRenderers.ts          # Analog TimeClock view renderers
  utils/dateTimeFormat.ts          # Locale 12h/24h + format helpers
  ui/ReactDateTimePicker.css       # Widget + popover styling
  ReactDateTimePicker.editorPreview.tsx
prototype/                         # Standalone Vite demo
```

---

## Documentation

| Document | Audience |
|----------|----------|
| [docs/WIDGET_DOCUMENTATION.md](docs/WIDGET_DOCUMENTATION.md) | Mendix developers, BA’s, support — full widget manual |
| [docs/blog/medium-innovites-mui-datetime-picker.md](docs/blog/medium-innovites-mui-datetime-picker.md) | Medium / community blog — introduction and how-to |
| This README | Developers — build, run, and repo overview |

---

## Third-party libraries

- [@mui/x-date-pickers](https://mui.com/x/react-date-pickers/) — picker UI (MIT / MUI licensing)
- [@mui/material](https://mui.com/material-ui/) — theming and inputs
- [date-fns](https://date-fns.org/) — parsing, formatting, locales (MIT)
- [@emotion/react](https://emotion.sh/) — styles used by MUI (MIT)

---

## License

Copyright (c) InnoVites B.V. — MIT. See `package.json` and project license terms.

---

## Author

**Narendran Jaganathan** — InnoVites

For issues and enhancements, use your team’s repository or issue tracker for this widget.
