## ReactDateTimePicker

Mendix pluggable widget (InnoVites) based on [Itvisors/mendix-ReactDateTimePicker](https://github.com/Itvisors/mendix-ReactDateTimePicker), modernized with `react-datepicker` + `date-fns` for improved UX on Mendix React client and non-React runtimes.

## Features

- Date & time, date-only, or time-only picker modes
- Locale support via `date-fns` (en, nl, de, fr, and more)
- Min/max dates, disable past, week numbers
- Clear button, Today shortcut, focus ring, calendar icon
- Read-only as control or text (Mendix standard)
- Studio Pro design preview (`editorPreview.tsx`)

## UI prototype (browser)

Run the standalone prototype without Mendix:

```bash
npm install
npm run prototype
```

Open **http://localhost:5173** — three demo cards show datetime, date, and time modes.

## Mendix runtime

1. Set `config.projectPath` in `package.json` to your Mendix test app folder (`.mpr` project).
2. `npm run build` then copy **one** `.mpk` from `dist/1.0.0/` into your app’s `widgets` folder.
3. **Remove duplicate packages** — only one file may define widget id `innovites.reactdatetimepicker.ReactDateTimePicker`. Delete extras such as `innovites.ReactDateTimePicker 2.mpk` if you see “widget packages could not be read”.
4. `npm run dev` — hot reload with Studio Pro on the same machine (`http://localhost:8080`).
5. Or `npm start` — watch build and copy widget into the test project `widgets` folder.

### Month / year selection

The calendar header includes **month** and **year** dropdowns (`<select>`) so users can jump directly without only using arrow buttons.

Design-time preview: drag the widget in Studio Pro; the preview uses `ReactDateTimePicker.editorPreview.tsx`.

## Build

```bash
npm run build
```

Output: `dist/1.0.0/innovites.reactdatetimepicker.ReactDateTimePicker.mpk`

## Reference

- [Itvisors GitHub](https://github.com/Itvisors/mendix-ReactDateTimePicker)
- Mendix Marketplace: React Date Time Picker (Itvisors)
